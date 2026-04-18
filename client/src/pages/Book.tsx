/**
 * Book a Call Page - Liquid Flow Aesthetics Design
 * - Pre-call questionnaire form
 * - Glassmorphic form cards
 * - Smooth form transitions
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  CheckCircle2,
  Building2,
  MessageSquare,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  services: string[];
  agreedToTerms: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessName: "",
  services: [],
  agreedToTerms: false,
};

export default function Book() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.businessName) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (formData.services.length === 0) {
      toast.error("Please select at least one service your med spa offers");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.agreedToTerms) {
      toast.error("Please agree to the Terms & Conditions and Privacy Policy");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("https://hook.us2.make.com/2qk018h9agzh2obxi965lejo04w8a65e", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit to webhook");
      }

      setIsSubmitting(false);
      
      // Redirect to /diagnostic passing data explicitly for Make.com deduplication
      const queryParams = new URLSearchParams({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      }).toString();

      window.location.href = `https://api.leadconnectorhq.com/widget/bookings/discovery-call-1ct8u?${queryParams}`;
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during submission. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
            Thank You, {formData.firstName}!
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            We've received your booking request. Our team will review your information
            and reach out within 24 hours to schedule your discovery call.
          </p>
          <div className="glass-card rounded-xl p-6 text-left">
            <h3 className="font-semibold font-[family-name:var(--font-display)] mb-4 text-foreground">
              What happens next?
            </h3>
            <ul className="space-y-3">
              {[
                "We'll review your business details",
                "You'll receive a calendar invite within 24 hours",
                "Prepare any questions you have about AI automation",
                "We'll discuss your specific needs on the call",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-[oklch(0.65_0.2_200)] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24">
      <div className="container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-[oklch(0.7_0.15_220)] mb-6">
            <Calendar className="w-4 h-4" />
            Free Discovery Call
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Book Your <span className="gradient-text">Discovery Call</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tell us about your med spa so we can prepare a customized demonstration
            of how Laserflow can transform your operations.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-2xl p-6 md:p-10"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold font-[family-name:var(--font-display)] text-foreground">
                  Your Information
                </h2>
                <p className="text-sm text-muted-foreground">
                  Let's get to know you and your business
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Smith"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@medspa.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                />
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <Label htmlFor="businessName" className="text-foreground font-semibold">
                Med Spa Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Radiant Skin Med Spa"
                value={formData.businessName}
                onChange={(e) => updateFormData("businessName", e.target.value)}
                className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
              />
            </div>

            <div className="space-y-3 mt-6 relative">
              <Label className="text-foreground font-semibold">
                Services Your Med Spa Offers <span className="text-destructive">*</span>
              </Label>
              {/* Selected service chips */}
              {formData.services.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.services.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#48CFCB]/15 border border-[#48CFCB]/30 text-[#48CFCB] text-sm font-medium"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            services: prev.services.filter((s) => s !== service),
                          }))
                        }
                        className="hover:text-white transition-colors ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {/* Search input */}
              <div className="relative">
                <Input
                  placeholder="Type to search services..."
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  onFocus={() => setServiceDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setServiceDropdownOpen(false), 200)}
                  className="bg-input border-border focus:border-[#48CFCB]"
                />
                {serviceDropdownOpen && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#12121A] border border-border rounded-lg max-h-[200px] overflow-y-auto shadow-xl">
                    {["Laser Hair Removal", "Botox", "Dermal Fillers", "Skincare", "Body Contouring", "IV Therapy", "Microneedling", "Chemical Peels", "PRP Therapy", "Tattoo Removal", "Skin Tightening", "Fat Dissolving", "Other"]
                      .filter(
                        (s) =>
                          !formData.services.includes(s) &&
                          s.toLowerCase().includes(serviceSearch.toLowerCase())
                      )
                      .map((service) => (
                        <button
                          key={service}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setFormData((prev) => ({
                              ...prev,
                              services: [...prev.services, service],
                            }));
                            setServiceSearch("");
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:bg-[#48CFCB]/10 hover:text-white transition-colors"
                        >
                          {service}
                        </button>
                      ))}
                  </div>
                )}
              </div>
              <details className="mt-2 group">
                <summary className="text-xs text-[#48CFCB] cursor-pointer inline-flex items-center gap-1 hover:text-[#48CFCB]/80 transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                  Why is this required? <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <p className="text-xs text-muted-foreground/70 mt-2 leading-relaxed pl-0.5">
                  This is a required field — it helps us build a custom growth plan specifically tailored to your services before the call, so we can hit the ground running.
                </p>
              </details>
            </div>


            <div className="pt-4 mt-6">
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border/50 bg-black/20">
                <Checkbox
                  id="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => updateFormData("agreedToTerms", checked === true)}
                />
                <Label htmlFor="agreedToTerms" className="text-sm font-normal text-muted-foreground leading-relaxed pt-0.5 inline-block">
                  I agree to Laserflow's <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=ca6aefbb-e411-4065-8cfb-36cbea11c613" target="_blank" rel="noopener noreferrer" className="text-[#48CFCB] hover:underline whitespace-nowrap">Terms &amp; Conditions</a> and <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=576499bb-e5ba-4839-989d-a639e19739ef" target="_blank" rel="noopener noreferrer" className="text-[#48CFCB] hover:underline whitespace-nowrap">Privacy Policy</a>, and consent to being contacted regarding my inquiry.
                </Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-10 pt-6 border-t border-border/50">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-gradient text-white border-0 min-w-[160px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                <>
                  Submit Request
                  <MessageSquare className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          <div className="mt-8 text-xs text-muted-foreground/80 leading-relaxed flex flex-col items-start space-y-2">
            <motion.div
              initial={false}
              animate={{ height: showDisclaimer ? "auto" : "48px" }}
              className="relative overflow-hidden w-full"
            >
              <div className="space-y-4">
                <p>
                  By clicking 'Submit', I agree to receive recurring marketing messages and outbound calls at the number provided. I understand these communications may be sent via automated technology, including an AI voice and pre-recorded messages, from Laserflow or its partners.
                </p>
                <p>
                  Consent is not a condition of purchase. Msg &amp; data rates may apply. I can opt-out at any time by replying STOP to any text or stating 'Unsubscribe' during a call.
                </p>
              </div>
              {!showDisclaimer && (
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
              )}
            </motion.div>
            <button
              onClick={() => setShowDisclaimer(!showDisclaimer)}
              type="button"
              className="text-[#48CFCB] hover:underline flex items-center gap-1.5 transition-colors pt-1"
            >
              {showDisclaimer ? (
                <>Show less <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>Read full disclaimer <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Your information is secure and will only be used to prepare for your call.
          </p>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.2_200)]" />
              No commitment
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.2_200)]" />
              Free consultation
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.2_200)]" />
              Custom demo
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
