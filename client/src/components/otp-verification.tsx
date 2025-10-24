import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OTPVerificationProps {
  userId: number;
  email: string;
  onVerified: () => void;
  type: 'signup' | 'login';
}

export default function OTPVerification({ userId, email, onVerified, type }: OTPVerificationProps) {
  const { toast } = useToast();
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const verifyMutation = useMutation({
    mutationFn: async (otpCode: string) => {
      const res = await apiRequest("POST", "/api/verify-otp", { userId, otpCode });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Verification Successful!",
        description: "You're now logged in.",
      });
      onVerified();
    },
    onError: (error: any) => {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid code. Please try again.",
        variant: "destructive",
      });
      // Clear inputs on error
      setOtpDigits(['', '', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/resend-otp", { userId });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Code Sent",
        description: "A new verification code has been sent to your email.",
      });
      setOtpDigits(['', '', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Resend",
        description: error.message || "Could not send a new code.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are filled
    if (value && index === 6 && newDigits.every(d => d !== '')) {
      const otpCode = newDigits.join('');
      verifyMutation.mutate(otpCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 7);
    const newDigits = pastedData.split('').concat(Array(7 - pastedData.length).fill(''));
    setOtpDigits(newDigits);

    // Focus the next empty input or last input
    const nextEmptyIndex = newDigits.findIndex(d => d === '');
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[6]?.focus();
      // Auto-submit if all digits are filled from paste
      if (pastedData.length === 7) {
        verifyMutation.mutate(pastedData);
      }
    }
  };

  const handleManualSubmit = () => {
    const otpCode = otpDigits.join('');
    if (otpCode.length !== 7) {
      toast({
        title: "Incomplete Code",
        description: "Please enter all 7 digits.",
        variant: "destructive",
      });
      return;
    }
    verifyMutation.mutate(otpCode);
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    if (local.length <= 2) return email;
    return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>
            {type === 'signup' 
              ? 'We sent a verification code to'
              : 'We sent a login code to'
            }
            <br />
            <span className="font-medium text-gray-900 dark:text-gray-100">{maskEmail(email)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
              Enter 7-Digit Code
            </label>
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {otpDigits.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-semibold"
                  data-testid={`input-otp-${index}`}
                  disabled={verifyMutation.isPending}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Code expires in 5 minutes
            </p>
          </div>

          <Button
            onClick={handleManualSubmit}
            className="w-full"
            disabled={verifyMutation.isPending || otpDigits.some(d => d === '')}
            data-testid="button-verify-otp"
          >
            {verifyMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Didn't receive the code?
            </p>
            <Button
              variant="link"
              onClick={() => resendMutation.mutate()}
              disabled={resendMutation.isPending}
              data-testid="button-resend-otp"
              className="text-blue-600 dark:text-blue-400"
            >
              {resendMutation.isPending ? 'Sending...' : 'Resend Code'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
