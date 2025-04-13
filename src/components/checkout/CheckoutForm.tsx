
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

// Mock data for Algerian wilayas
const wilayasData = [
  { id: 1, name: 'Adrar' },
  { id: 2, name: 'Chlef' },
  { id: 3, name: 'Laghouat' },
  { id: 4, name: 'Oum El Bouaghi' },
  { id: 5, name: 'Batna' },
  { id: 6, name: 'Béjaïa' },
  { id: 7, name: 'Biskra' },
  { id: 8, name: 'Béchar' },
  { id: 9, name: 'Blida' },
  { id: 10, name: 'Bouira' },
  { id: 16, name: 'Alger' },
  { id: 31, name: 'Oran' },
  // This would be expanded to include all 58 wilayas
];

// Mock data for communes
const communesData = {
  // Communes for Alger
  16: [
    { id: 1601, name: 'Alger Centre' },
    { id: 1602, name: 'Bab El Oued' },
    { id: 1603, name: 'Bologhine' },
    { id: 1604, name: 'Casbah' },
    { id: 1605, name: 'Hussein Dey' },
  ],
  // Communes for Oran
  31: [
    { id: 3101, name: 'Oran' },
    { id: 3102, name: 'Bir El Djir' },
    { id: 3103, name: 'Es Senia' },
    { id: 3104, name: 'Arzew' },
    { id: 3105, name: 'Bethioua' },
  ],
  // This would be expanded to include communes for all wilayas
};

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  phoneNumber: z.string().min(9, { message: 'Please enter a valid phone number.' }),
  wilaya: z.string({ required_error: 'Please select a wilaya.' }),
  commune: z.string({ required_error: 'Please select a commune.' }),
  deliveryMethod: z.enum(['home', 'bureau'], {
    required_error: 'Please select a delivery method.',
  }),
  address: z.string().optional().refine(val => {
    // Address is required only for home delivery
    return val !== undefined && val.trim() !== '';
  }, {
    message: 'Address is required for home delivery.',
    path: ['address'],
  }),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CheckoutForm: React.FC = () => {
  const [communes, setCommunes] = useState<{ id: number; name: string }[]>([]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      deliveryMethod: 'home',
      notes: '',
    },
  });

  const deliveryMethod = form.watch('deliveryMethod');
  const selectedWilaya = form.watch('wilaya');

  // Update communes when wilaya changes
  useEffect(() => {
    if (selectedWilaya) {
      const wilayaId = parseInt(selectedWilaya);
      setCommunes(communesData[wilayaId as keyof typeof communesData] || []);
      form.setValue('commune', '');
    }
  }, [selectedWilaya, form]);

  // Update schema validation based on delivery method
  useEffect(() => {
    if (deliveryMethod === 'home') {
      form.register('address', { required: 'Address is required for home delivery' });
    }
  }, [deliveryMethod, form]);

  const onSubmit = (data: FormData) => {
    console.log('Order submitted:', data);
    // In a real app, this would submit the order to the backend
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+213 123 456 789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="wilaya"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wilaya</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a wilaya" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {wilayasData.map((wilaya) => (
                      <SelectItem key={wilaya.id} value={wilaya.id.toString()}>
                        {wilaya.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commune"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commune</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!selectedWilaya}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a commune" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {communes.map((commune) => (
                      <SelectItem key={commune.id} value={commune.id.toString()}>
                        {commune.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="deliveryMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Delivery Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col md:flex-row gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="home" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Home Delivery
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="bureau" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Office Pick-up
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {deliveryMethod === 'home' && (
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your delivery address"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide your complete address for home delivery.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special instructions for your order..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-crocco hover:bg-crocco-dark">
          Complete Order
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
