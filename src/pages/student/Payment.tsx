
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

const StudentPayment = () => {
  const { user, updateUser } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      updateUser({ paymentStatus: 'pending' });
      toast.success("Payment evidence uploaded. Awaiting verification.");
      setIsUploading(false);
      navigate("/student/dashboard");
    }, 2000);
  };

  const handleOnlinePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      updateUser({ paymentStatus: 'verified' });
      toast.success("Payment successful! You can now download your SIWES letter.");
      setIsProcessing(false);
      navigate("/student/dashboard");
    }, 3000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">SIWES Payment</h1>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Payment for SIWES Letter</CardTitle>
            <CardDescription>
              Please make a payment of ₦7,000 to access and download your SIWES letter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="online">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="online">Pay Online</TabsTrigger>
                <TabsTrigger value="evidence">Upload Payment Evidence</TabsTrigger>
              </TabsList>
              
              <TabsContent value="online" className="space-y-4 mt-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium mb-2">Payment Details</h3>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SIWES Payment Fee:</span>
                      <span className="font-medium">₦7,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee:</span>
                      <span className="font-medium">₦150.00</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between">
                      <span className="text-muted-foreground font-medium">Total:</span>
                      <span className="font-bold">₦7,150.00</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiration">Expiration Date</Label>
                      <Input id="expiration" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleOnlinePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing payment..." : "Pay ₦7,150.00"}
                </Button>
              </TabsContent>
              
              <TabsContent value="evidence" className="space-y-4 mt-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium mb-2">Bank Details</h3>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank Name:</span>
                      <span className="font-medium">First Bank of Nigeria</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Number:</span>
                      <span className="font-medium">1234567890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Name:</span>
                      <span className="font-medium">Abraham Adesanya Polytechnic</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">₦7,000.00</span>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <Label htmlFor="paymentProof" className="block text-sm font-medium">
                      Upload Payment Proof
                    </Label>
                    <p className="text-xs text-gray-500 mb-2">
                      Please upload a screenshot or photo of your payment receipt
                    </p>
                    <Input 
                      id="paymentProof" 
                      type="file" 
                      className="cursor-pointer"
                      accept="image/png, image/jpeg, image/jpg, application/pdf"
                      onChange={handleFileChange}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={!file || isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload Payment Evidence"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-sm text-muted-foreground">
              Your payment will be verified by the SIWES coordinator. Once verified, 
              you will be able to download your SIWES letter from your dashboard.
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentPayment;
