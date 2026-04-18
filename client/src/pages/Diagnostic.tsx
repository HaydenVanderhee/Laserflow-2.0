import { useState, useEffect } from "react";
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
import { CheckCircle2, Send, ArrowRight, ArrowLeft, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface DiagnosticData {
    // Hidden from URL params
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    // Step 1: Business Details
    monthlyRevenue: string;     // Select/Dropdown or Buttons
    staffMembers: string;       // 1-5, 6-15, 16-30, 30+
    softwareCrm: string;        // text input
    monthlyLeads: string;       // Select
    painPoints: string[];       // checkboxes (array of strings)
    biggestChallenge: string;   // text area

    // Step 2: Goals & Timeline
    implementedAutomationPast: string; // Yes / No
    automationGoals: string;          // text area
    implementationTimeline: string;   // As soon as possible, 1-3 months, Just exploring
    revenueTarget3Months: string;     // text area

    // Step 3: Diagnostic Traps & Compliance
    runAds: string;
    adSpending: string;
    adManager: string;
    averageLtv: string;
    deadLeads: string;
    inquiryResponseTime: string;
    additionalInfo: string;
    agreedToAssessment: boolean;
    agreedToTerms: boolean;
}

const initialData: DiagnosticData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    monthlyRevenue: "",
    staffMembers: "",
    softwareCrm: "",
    monthlyLeads: "",
    painPoints: [],
    biggestChallenge: "",

    implementedAutomationPast: "",
    automationGoals: "",
    implementationTimeline: "",
    revenueTarget3Months: "",

    runAds: "",
    adSpending: "",
    adManager: "",
    averageLtv: "",
    deadLeads: "",
    inquiryResponseTime: "",
    additionalInfo: "",
    agreedToAssessment: false,
    agreedToTerms: false,
};

export default function Diagnostic() {
    const [, setLocation] = useLocation();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<DiagnosticData>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.pageX, y: e.pageY });
    };

    useEffect(() => {
        // Parse URL parameters
        const searchParams = new URLSearchParams(window.location.search);
        setFormData((prev) => ({
            ...prev,
            firstName: searchParams.get("firstName") || searchParams.get("first_name") || "",
            lastName: searchParams.get("lastName") || searchParams.get("last_name") || "",
            email: searchParams.get("email") || "",
            phone: searchParams.get("phone") || "",
        }));
    }, []);

    const updateFormData = (field: keyof DiagnosticData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateStep1 = (): boolean => {
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        if (!formData.monthlyRevenue) {
            toast.error("Please explicitly select your Current Monthly Revenue.");
            return false;
        }
        if (!formData.staffMembers) {
            toast.error("Please indicate how many staff members your med spa has.");
            return false;
        }
        if (!formData.monthlyLeads) {
            toast.error("Please indicate your estimated monthly lead volume.");
            return false;
        }
        return true;
    };

    const validateStep2 = (): boolean => {
        if (!formData.implementationTimeline) {
            toast.error("Please let us know your implementation timeline.");
            return false;
        }
        return true;
    };

    const validateStep3 = (): boolean => {
        if (!formData.averageLtv) {
            toast.error("Please provide your average LTV.");
            return false;
        }
        if (!formData.agreedToTerms) {
            toast.error("Please agree to the Terms & Conditions and Privacy Policy.");
            return false;
        }
        return true;
    };

    const handleNextStep = () => {
        if (currentStep === 1 && !validateStep1()) return;
        if (currentStep === 2 && !validateStep2()) return;
        setCurrentStep((prev) => prev + 1);
        // Scroll to top of the form container smoothly
        document.querySelector('.lg\\:overflow-y-auto')?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevStep = () => {
        setCurrentStep((prev) => prev - 1);
        document.querySelector('.lg\\:overflow-y-auto')?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async () => {
        if (!validateStep3()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch("https://hook.us2.make.com/p3w1oqmpokheg4fpeod8zt6saea79jj8", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit diagnostic data");
            }

            setIsSubmitting(false);
            setIsSubmitted(true);
            toast.success("Diagnostic submitted successfully!");
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An error occurred during submission. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center py-24 bg-[#0B1120]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-lg mx-auto px-4"
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0099ff] to-[#00ccff] flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4 text-white">
                        Diagnostic Complete
                    </h1>
                    <p className="text-slate-400 text-lg mb-8">
                        Thank you, {formData.firstName || "there"}. We have received your technical diagnostic.
                        Our architects will review your lead flow infrastructure prior to our call.
                    </p>
                    <Button onClick={() => setLocation("/")} className="bg-[#0099ff] hover:bg-[#0077ee] text-white border-0">
                        Return to Homepage
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-[#060913] relative overflow-x-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Very faint dark-grey geometric grid overlay background */}
            <div
                className="absolute inset-0 z-0 opacity-40 pointer-events-none transition-opacity"
                style={{
                    backgroundImage: `linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Interactive electric-blue hover grid */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, #0EA5E9 1px, transparent 1px), linear-gradient(to bottom, #0EA5E9 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: 0.1,
                    maskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`
                }}
            />
            {/* --- HERO SECTION (Constrained Viewport) --- */}
            <div className="relative w-full h-[60vh] min-h-[480px] max-h-[600px] flex flex-col items-center justify-center px-4 pt-8 z-10 transition-all">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-[-8vh]"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold font-[family-name:var(--font-display)] mb-8 text-white tracking-tight leading-[1.1]">
                        Call Confirmed.<br />
                        <span className="text-[#0EA5E9]">Final Step.</span>
                    </h1>

                    <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                        Please complete this technical diagnostic so our architects can map your current lead flow before our call.
                    </p>

                    <div className="bg-[#0B1120] border border-[#0EA5E9]/30 rounded-2xl p-4 max-w-lg mx-auto shadow-[0_0_20px_rgba(14,165,233,0.1)] mb-0">
                        <p className="text-[#0EA5E9] font-medium text-sm md:text-base flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            This diagnostic is mandatory to keep your scheduled appointment.
                        </p>
                    </div>

                </motion.div>
            </div>

            {/* --- VIDEO SECTION --- */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-4 md:px-8 py-8">
                <p className="text-center text-slate-300 text-lg md:text-xl font-medium mb-6">
                    Please watch this short video before filling out the form below
                </p>
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0B1120]">
                    <video
                        controls
                        className="w-full"
                        preload="metadata"
                        playsInline
                    >
                        <source src="/Video%20Project%206.mp4?v=3" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            {/* --- FORM CONTAINER --- */}
            <div id="form-section" className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 pb-24 mt-2">
                {/* Split Screen Container (Steps 1, 2, 3) */}
                <div className="w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative bg-[#0B1120] lg:h-[780px]">

                    {/* Left Column (40% Width - The "Enterprise Sidecar") */}
                    <div className="w-full lg:w-[40%] bg-[#080C17] p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col h-full">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4 text-white">
                                Session Booked.<br />
                                <span className="text-[#0EA5E9]">Next Steps.</span>
                            </h2>
                            <div className="space-y-4">
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Please complete this technical diagnostic so our architects can map your current lead flow before our call.
                                </p>
                                <p className="text-slate-500 text-[15px] leading-relaxed">
                                    Your clinic's data is strictly confidential. This assessment is used exclusively by our architects to engineer your custom infrastructure blueprint.
                                </p>
                            </div>
                        </motion.div>

                        {/* Timeline */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-auto md:mt-12"
                        >
                            <h3 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-8">
                                Next Steps
                            </h3>

                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                                {/* Step 1 */}
                                <div className="relative flex items-start group">
                                    <div className={`absolute left-0 w-7 h-7 bg-[#080C17] rounded-full border-2 flex items-center justify-center z-10 transition-all ${currentStep >= 1 ? 'border-[#0EA5E9]' : 'border-slate-700'} ${currentStep === 1 ? 'shadow-[0_0_10px_rgba(14,165,233,0.3)]' : ''}`}>
                                        {currentStep >= 1 && <div className="w-2 h-2 bg-[#0EA5E9] rounded-full" />}
                                    </div>
                                    <div className="ml-12 flex flex-col transition-all">
                                        <span className={`${currentStep >= 1 ? 'text-[#FFFFFF] font-semibold' : 'text-[#9CA3AF] font-medium'} text-lg mb-1`}>Business Operations</span>
                                        <span className={`${currentStep >= 1 ? 'text-slate-400' : 'text-slate-500'} text-sm`}>We map your current lead flow</span>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative flex items-start group">
                                    <div className={`absolute left-0 w-7 h-7 bg-[#080C17] rounded-full border-2 flex items-center justify-center z-10 transition-all ${currentStep >= 2 ? 'border-[#0EA5E9]' : 'border-slate-700'} ${currentStep === 2 ? 'shadow-[0_0_10px_rgba(14,165,233,0.3)]' : ''}`}>
                                        {currentStep >= 2 && <div className="w-2 h-2 bg-[#0EA5E9] rounded-full" />}
                                    </div>
                                    <div className="ml-12 flex flex-col transition-all">
                                        <span className={`${currentStep >= 2 ? 'text-[#FFFFFF] font-semibold' : 'text-[#9CA3AF] font-medium'} text-lg mb-1`}>Goals & Timeline</span>
                                        <span className={`${currentStep >= 2 ? 'text-slate-400' : 'text-slate-500'} text-sm`}>We establish your automation path</span>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative flex items-start group">
                                    <div className={`absolute left-0 w-7 h-7 bg-[#080C17] rounded-full border-2 flex items-center justify-center z-10 transition-all ${currentStep >= 3 ? 'border-[#0EA5E9]' : 'border-slate-700'} ${currentStep === 3 ? 'shadow-[0_0_10px_rgba(14,165,233,0.3)]' : ''}`}>
                                        {currentStep >= 3 && <div className="w-2 h-2 bg-[#0EA5E9] rounded-full" />}
                                    </div>
                                    <div className="ml-12 flex flex-col transition-all">
                                        <span className={`${currentStep >= 3 ? 'text-[#FFFFFF] font-semibold' : 'text-[#9CA3AF] font-medium'} text-lg mb-1`}>Diagnostic Traps</span>
                                        <span className={`${currentStep >= 3 ? 'text-slate-400' : 'text-slate-500'} text-sm`}>We unearth revenue leaks</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column (60% Width - The Form) */}
                    <div className="w-full lg:w-[60%] p-8 md:p-12 lg:p-20 lg:pt-16 pb-24 lg:pb-32 bg-[#0B1120] lg:h-full lg:overflow-y-auto lg:[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-1 lg:pt-0"
                        >
                            {/* --- STEP 1 UI --- */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="mb-10">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-[#0EA5E9] flex items-center justify-center flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                    <circle cx="9" cy="7" r="4" />
                                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Business Details</h2>
                                                <p className="text-slate-400 text-sm">Help us understand your current operations</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="email" className="text-slate-300 font-semibold text-[15px]">
                                                Email Address <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={formData.email}
                                                onChange={(e) => updateFormData("email", e.target.value)}
                                                className="bg-[#131B2F] border-slate-700 focus-visible:ring-1 focus-visible:ring-[#0EA5E9] focus-visible:border-[#0EA5E9] transition-all text-white placeholder:text-slate-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] h-auto py-3.5"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-slate-300 font-semibold text-[15px]">
                                                Current Monthly Revenue <span className="text-red-500">*</span>
                                            </Label>
                                            <Select
                                                value={formData.monthlyRevenue}
                                                onValueChange={(value) => updateFormData("monthlyRevenue", value)}
                                            >
                                                <SelectTrigger className="bg-[#131B2F] border-slate-700 md:w-[350px] focus:ring-[#0EA5E9] text-white h-auto py-3.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
                                                    <SelectValue placeholder="Select revenue range" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#131B2F] border-slate-700 text-white shadow-2xl">
                                                    <SelectItem value="under-50k" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">Under $50k</SelectItem>
                                                    <SelectItem value="50k-100k" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">$50k - $100k</SelectItem>
                                                    <SelectItem value="100k-150k" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">$100k - $150k</SelectItem>
                                                    <SelectItem value="150k-250k" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">$150k - $250k</SelectItem>
                                                    <SelectItem value="250k-400k" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">$250k - $400k</SelectItem>
                                                    <SelectItem value="400k-600k" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">$400k - $600k</SelectItem>
                                                    <SelectItem value="600k-1m" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">$600k - $1M</SelectItem>
                                                    <SelectItem value="1m+" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">$1M+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-slate-300 font-semibold text-[15px]">
                                                How many staff members does your med spa have? <span className="text-red-500">*</span>
                                            </Label>
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                                {["1-5", "6-15", "16-30", "30+"].map((size) => (
                                                    <button
                                                        key={size}
                                                        type="button"
                                                        onClick={() => updateFormData("staffMembers", size)}
                                                        className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${formData.staffMembers === size
                                                            ? "bg-[#0EA5E9]/10 border-[#0EA5E9] text-[#0EA5E9] shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                                                            : "bg-[#131B2F] border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-[#1A233A]"
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="softwareCrm" className="text-slate-300 font-semibold text-[15px]">
                                                What software do you currently use for scheduling/CRM?
                                            </Label>
                                            <Input
                                                id="softwareCrm"
                                                placeholder="e.g., Mindbody, Vagaro, Zenoti, or None"
                                                value={formData.softwareCrm}
                                                onChange={(e) => updateFormData("softwareCrm", e.target.value)}
                                                className="bg-[#131B2F] border-slate-700 focus-visible:ring-1 focus-visible:ring-[#0EA5E9] focus-visible:border-[#0EA5E9] transition-all text-white placeholder:text-slate-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] h-auto py-3.5"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-slate-300 font-semibold text-[15px]">
                                                How many leads do you receive per month? <span className="text-red-500">*</span>
                                            </Label>
                                            <Select
                                                value={formData.monthlyLeads}
                                                onValueChange={(value) => updateFormData("monthlyLeads", value)}
                                            >
                                                <SelectTrigger className="bg-[#131B2F] border-slate-700 md:w-[350px] focus:ring-[#0EA5E9] text-white h-auto py-3.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
                                                    <SelectValue placeholder="Select monthly lead volume" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#131B2F] border-slate-700 text-white shadow-2xl">
                                                    <SelectItem value="under-50" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">Under 50</SelectItem>
                                                    <SelectItem value="50-100" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">50 - 100</SelectItem>
                                                    <SelectItem value="100-300" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">100 - 300</SelectItem>
                                                    <SelectItem value="300-500" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">300 - 500</SelectItem>
                                                    <SelectItem value="500+" className="focus:bg-[#0EA5E9]/20 focus:text-white py-3 leading-loose">500+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="text-slate-300 font-semibold text-[15px]">
                                                Bottlenecks / Pain Points (select all that apply)
                                            </Label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                                {[
                                                    "Leads getting lost", "Staff too busy to follow up",
                                                    "No shows", "Price shoppers",
                                                    "Scaling issues", "Unclear ROI",
                                                    "Busy admin", "Inconsistent bookings"
                                                ].map((painPoint) => (
                                                    <div key={painPoint} className="flex items-center space-x-3 cursor-pointer group">
                                                        <Checkbox
                                                            id={`pp-${painPoint.toLowerCase().replace(/\s+/g, '-')}`}
                                                            checked={formData.painPoints.includes(painPoint)}
                                                            onCheckedChange={(checked) => {
                                                                const newPoints = checked
                                                                    ? [...formData.painPoints, painPoint]
                                                                    : formData.painPoints.filter(p => p !== painPoint);
                                                                updateFormData("painPoints", newPoints);
                                                            }}
                                                            className="w-5 h-5 rounded-md data-[state=checked]:bg-[#0EA5E9] data-[state=checked]:border-[#0EA5E9] border-slate-600 group-hover:border-slate-500 transition-colors"
                                                        />
                                                        <Label htmlFor={`pp-${painPoint.toLowerCase().replace(/\s+/g, '-')}`} className="text-slate-200 cursor-pointer text-sm">{painPoint}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="biggestChallenge" className="text-slate-300 font-semibold text-[15px]">
                                                Your biggest challenge right now
                                            </Label>
                                            <Textarea
                                                id="biggestChallenge"
                                                placeholder="Tell us about the main challenge you're facing in your med spa operations..."
                                                value={formData.biggestChallenge}
                                                onChange={(e) => updateFormData("biggestChallenge", e.target.value)}
                                                className="bg-[#131B2F] border-slate-700 min-h-[120px] focus-visible:ring-1 focus-visible:ring-[#0EA5E9] focus-visible:border-[#0EA5E9] transition-all text-white placeholder:text-slate-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] resize-y p-5"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* --- STEP 2 UI --- */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="mb-10">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-[#0EA5E9] flex items-center justify-center flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <circle cx="12" cy="12" r="6" />
                                                    <circle cx="12" cy="12" r="2" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Goals & Timeline</h2>
                                                <p className="text-slate-400 text-sm">Tell us about your automation goals</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-3 pt-2">
                                            <Label className="text-slate-300 font-semibold text-[15px]">Have you ever implemented any automation/AI systems in the past?</Label>
                                            <RadioGroup
                                                value={formData.implementedAutomationPast}
                                                onValueChange={(value) => updateFormData("implementedAutomationPast", value)}
                                                className="flex gap-8 pt-2"
                                            >
                                                <div className="flex items-center space-x-3 cursor-pointer group">
                                                    <RadioGroupItem value="yes" id="auto-past-yes" className="w-5 h-5 text-[#0EA5E9] border-slate-600 data-[state=checked]:border-[#0EA5E9] focus-visible:ring-[#0EA5E9] group-hover:border-[#0EA5E9]/50 transition-colors" />
                                                    <Label htmlFor="auto-past-yes" className="text-slate-200 cursor-pointer font-medium">Yes</Label>
                                                </div>
                                                <div className="flex items-center space-x-3 cursor-pointer group">
                                                    <RadioGroupItem value="no" id="auto-past-no" className="w-5 h-5 text-[#0EA5E9] border-slate-600 data-[state=checked]:border-[#0EA5E9] focus-visible:ring-[#0EA5E9] group-hover:border-[#0EA5E9]/50 transition-colors" />
                                                    <Label htmlFor="auto-past-no" className="text-slate-200 cursor-pointer font-medium">No</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="automationGoals" className="text-slate-300 font-semibold text-[15px]">
                                                What are your main goals for automation?
                                            </Label>
                                            <Textarea
                                                id="automationGoals"
                                                placeholder="e.g., Reduce response time, increase bookings, free up staff time..."
                                                value={formData.automationGoals}
                                                onChange={(e) => updateFormData("automationGoals", e.target.value)}
                                                className="bg-[#131B2F] border-slate-700 min-h-[120px] focus-visible:ring-1 focus-visible:ring-[#0EA5E9] focus-visible:border-[#0EA5E9] transition-all text-white placeholder:text-slate-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] resize-y p-5"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-slate-300 font-semibold text-[15px]">
                                                When are you looking to implement automation? <span className="text-red-500">*</span>
                                            </Label>
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                {["As soon as possible", "1-3 months", "Just exploring"].map((timeline) => (
                                                    <button
                                                        key={timeline}
                                                        type="button"
                                                        onClick={() => updateFormData("implementationTimeline", timeline)}
                                                        className={`py-4 px-4 rounded-xl border text-sm font-semibold transition-all ${formData.implementationTimeline === timeline
                                                            ? "bg-[#0EA5E9]/10 border-[#0EA5E9] text-[#0EA5E9] shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                                                            : "bg-[#131B2F] border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-[#1A233A]"
                                                            }`}
                                                    >
                                                        {timeline}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="revenueTarget3Months" className="text-slate-300 font-semibold text-[15px]">
                                                If we could fix your booking system in 30 days, what is your revenue target for the next 3 months?
                                            </Label>
                                            <Textarea
                                                id="revenueTarget3Months"
                                                placeholder="e.g., Increase revenue by 30%, reach $50k/month, etc."
                                                value={formData.revenueTarget3Months}
                                                onChange={(e) => updateFormData("revenueTarget3Months", e.target.value)}
                                                className="bg-[#131B2F] border-slate-700 min-h-[120px] focus-visible:ring-1 focus-visible:ring-[#0EA5E9] focus-visible:border-[#0EA5E9] transition-all text-white placeholder:text-slate-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] resize-y p-5"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* --- STEP 3 UI --- */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    {/* Section 1: The Diagnostic Traps */}
                                    <div className="mb-12">
                                        <h2 className="text-xl font-semibold text-white mb-6 font-[family-name:var(--font-display)] flex items-center gap-3">
                                            <span className="w-7 h-7 rounded-full bg-[#0EA5E9]/15 text-[#0EA5E9] flex items-center justify-center text-sm border border-[#0EA5E9]/30">3</span>
                                            The Diagnostic Traps
                                        </h2>
                                        <div className="space-y-8">
                                            <div className="space-y-3">
                                                <Label className="text-slate-300">Do you currently run ads for your med spa?</Label>
                                                <RadioGroup
                                                    value={formData.runAds}
                                                    onValueChange={(value) => updateFormData("runAds", value)}
                                                    className="flex gap-8 pt-1"
                                                >
                                                    <div className="flex items-center space-x-3 cursor-pointer group">
                                                        <RadioGroupItem value="yes" id="diag-ads-yes" className="w-5 h-5 text-[#0EA5E9] border-slate-600 data-[state=checked]:border-[#0EA5E9] focus-visible:ring-[#0EA5E9] group-hover:border-[#0EA5E9]/50 transition-colors" />
                                                        <Label htmlFor="diag-ads-yes" className="text-slate-200 cursor-pointer">Yes</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-3 cursor-pointer group">
                                                        <RadioGroupItem value="no" id="diag-ads-no" className="w-5 h-5 text-[#0EA5E9] border-slate-600 data-[state=checked]:border-[#0EA5E9] focus-visible:ring-[#0EA5E9] group-hover:border-[#0EA5E9]/50 transition-colors" />
                                                        <Label htmlFor="diag-ads-no" className="text-slate-200 cursor-pointer">No</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            {formData.runAds === "yes" && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    className="grid grid-cols-1 gap-6 bg-[#080C17] p-5 rounded-xl border border-slate-800/80 -mt-2 mb-2"
                                                >
                                                    <div className="space-y-3">
                                                        <Label className="text-slate-300">Monthly ad spending</Label>
                                                        <Select
                                                            value={formData.adSpending}
                                                            onValueChange={(value) => updateFormData("adSpending", value)}
                                                        >
                                                            <SelectTrigger className="bg-[#131B2F] border-slate-700 focus:ring-[#0EA5E9] text-white h-auto py-3.5">
                                                                <SelectValue placeholder="Select spending amount" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-[#131B2F] border-slate-700 text-white shadow-2xl">
                                                                <SelectItem value="under-1k" className="focus:bg-[#0EA5E9]/20 focus:text-white">Under $1,000</SelectItem>
                                                                <SelectItem value="1k-3k" className="focus:bg-[#0EA5E9]/20 focus:text-white">$1,000 - $3,000</SelectItem>
                                                                <SelectItem value="3k-5k" className="focus:bg-[#0EA5E9]/20 focus:text-white">$3,000 - $5,000</SelectItem>
                                                                <SelectItem value="5k-10k" className="focus:bg-[#0EA5E9]/20 focus:text-white">$5,000 - $10,000</SelectItem>
                                                                <SelectItem value="10k+" className="focus:bg-[#0EA5E9]/20 focus:text-white">$10,000+</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label className="text-slate-300">Who manages your ads?</Label>
                                                        <Select
                                                            value={formData.adManager}
                                                            onValueChange={(value) => updateFormData("adManager", value)}
                                                        >
                                                            <SelectTrigger className="bg-[#131B2F] border-slate-700 focus:ring-[#0EA5E9] text-white h-auto py-3.5">
                                                                <SelectValue placeholder="Select manager" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-[#131B2F] border-slate-700 text-white shadow-2xl">
                                                                <SelectItem value="in-house" className="focus:bg-[#0EA5E9]/20 focus:text-white">We manage them ourselves</SelectItem>
                                                                <SelectItem value="agency" className="focus:bg-[#0EA5E9]/20 focus:text-white">An ads agency</SelectItem>
                                                                <SelectItem value="freelancer" className="focus:bg-[#0EA5E9]/20 focus:text-white">A freelancer/contractor</SelectItem>
                                                                <SelectItem value="mix" className="focus:bg-[#0EA5E9]/20 focus:text-white">Mix of in-house and external</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </motion.div>
                                            )}

                                            <div className="space-y-3">
                                                <Label className="text-slate-300">
                                                    What is your average LTV per patient? <span className="text-red-500">*</span>
                                                </Label>
                                                <Select
                                                    value={formData.averageLtv}
                                                    onValueChange={(value) => updateFormData("averageLtv", value)}
                                                >
                                                    <SelectTrigger className="bg-[#131B2F] border-slate-700 md:w-1/2 focus:ring-[#0EA5E9] text-white h-auto py-3.5">
                                                        <SelectValue placeholder="Select average LTV per patient" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#131B2F] border-slate-700 text-white shadow-2xl">
                                                        <SelectItem value="under-1k" className="focus:bg-[#0EA5E9]/20 focus:text-white">Under $1,000</SelectItem>
                                                        <SelectItem value="1k-3k" className="focus:bg-[#0EA5E9]/20 focus:text-white">$1,000 - $3,000</SelectItem>
                                                        <SelectItem value="3k-5k" className="focus:bg-[#0EA5E9]/20 focus:text-white">$3,000 - $5,000</SelectItem>
                                                        <SelectItem value="5k+" className="focus:bg-[#0EA5E9]/20 focus:text-white">$5,000+</SelectItem>
                                                        <SelectItem value="dont-know" className="focus:bg-[#0EA5E9]/20 focus:text-white">I don't track this currently</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Additional Context & Compliance */}
                                            <div className="space-y-3">
                                                <Label htmlFor="additionalInfo" className="text-slate-400">
                                                    Anything else you'd like us to know? (Optional)
                                                </Label>
                                                <Textarea
                                                    id="additionalInfo"
                                                    placeholder="Add any additional context here..."
                                                    value={formData.additionalInfo}
                                                    onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                                                    className="bg-[#131B2F] border-slate-700 min-h-[120px] focus-visible:ring-1 focus-visible:ring-[#0EA5E9] focus-visible:border-[#0EA5E9] transition-all text-white placeholder:text-slate-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] resize-y p-5"
                                                />
                                            </div>

                                            <div className="space-y-5 bg-[#080C17] p-6 rounded-xl border border-slate-800/80">


                                                <div className="flex items-start space-x-4">
                                                    <Checkbox
                                                        id="agreedToTerms"
                                                        checked={formData.agreedToTerms}
                                                        onCheckedChange={(checked) => updateFormData("agreedToTerms", checked === true)}
                                                        className="mt-1 w-5 h-5 data-[state=checked]:bg-[#0EA5E9] data-[state=checked]:border-[#0EA5E9] border-slate-600"
                                                    />
                                                    <Label htmlFor="agreedToTerms" className="text-sm font-normal text-slate-300 leading-relaxed cursor-pointer pt-0.5">
                                                        I agree to LaserFlow's <a href="#" className="text-[#0EA5E9] hover:text-[#38bdf8] hover:underline transition-colors">Terms & Conditions</a> and <a href="#" className="text-[#0EA5E9] hover:text-[#38bdf8] hover:underline transition-colors">Privacy Policy</a>. <span className="text-red-500">*</span>
                                                    </Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Footer Submit Area */}
                            <div className="pt-8 mt-12 border-t border-slate-800/60 flex items-center justify-between">
                                {currentStep > 1 ? (
                                    <Button
                                        onClick={handlePrevStep}
                                        variant="outline"
                                        className="bg-transparent border-slate-700 hover:bg-[#131B2F] hover:text-white text-slate-300 px-6 py-6 h-auto transition-all rounded-xl"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Previous
                                    </Button>
                                ) : (
                                    <div></div>
                                )}

                                {currentStep < 3 ? (
                                    <Button
                                        onClick={handleNextStep}
                                        className="bg-[#0EA5E9] hover:bg-[#0284c7] hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] text-white font-semibold px-8 py-6 h-auto text-base rounded-xl transition-all duration-300 min-w-[160px]"
                                    >
                                        Next Step
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="bg-[#0EA5E9] hover:bg-[#0284c7] hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] text-white font-semibold px-8 py-6 h-auto text-base rounded-xl transition-all duration-300 min-w-[280px]"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-3">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Submit Form
                                                <Send className="w-5 h-5 ml-1" />
                                            </span>
                                        )}
                                    </Button>
                                )}
                            </div>

                            {currentStep === 3 && (
                                <div className="flex items-center justify-end gap-2 text-slate-500 mt-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <span className="text-[13px] font-medium">End-to-end encrypted. Your clinic's data is strictly confidential.</span>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Bottom Scroll Fade/Blur Indicator (Desktop Only) */}
                    <div 
                        className="hidden lg:block absolute bottom-0 right-0 w-[60%] h-32 pointer-events-none z-10 rounded-br-3xl"
                        style={{
                            background: 'linear-gradient(to top, #0B1120 20%, rgba(11, 17, 32, 0) 100%)',
                            backdropFilter: 'blur(2px)',
                            WebkitBackdropFilter: 'blur(2px)',
                            maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
