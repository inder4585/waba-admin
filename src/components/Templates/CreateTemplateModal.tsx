import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Need to ensure Textarea exists, if not will use Input
// src/components/ui/textarea.tsx exists.
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateTemplateModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [body, setBody] = useState("Hello {{1}}, welcome to our service!");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toast.success("Template submitted for approval");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" /> Create Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[600px] flex flex-col p-0 overflow-hidden">
        <div className="p-6 pb-0">
             <DialogHeader>
            <DialogTitle>Create Message Template</DialogTitle>
            <DialogDescription>
                Design your WhatsApp message template with preview.
            </DialogDescription>
            </DialogHeader>
        </div>
       
       <div className="flex flex-1 overflow-hidden mt-6 border-t">
           {/* Left: Form */}
           <div className="w-1/2 p-6 border-r overflow-y-auto space-y-4 bg-slate-50/50">
                <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input 
                        id="name" 
                        placeholder="e.g., welcome_message" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <p className="text-xs text-slate-400">Lowercase, underscores only.</p>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input id="language" defaultValue="English (US)" disabled />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="body">Body Text</Label>
                    <Textarea 
                        id="body" 
                        rows={6}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="font-mono text-sm"
                    />
                    <p className="text-xs text-slate-400">Use {'{{1}}'}, {'{{2}}'} for variables.</p>
                </div>
           </div>

           {/* Right: Preview */}
           <div className="w-1/2 p-6 bg-slate-100 flex items-center justify-center">
                <div className="w-[280px] bg-[#e5ddd5] rounded-lg shadow-lg overflow-hidden border border-slate-200">
                    <div className="bg-[#005e54] h-8 flex items-center px-3 space-x-2">
                        <div className="w-6 h-6 rounded-full bg-white/20"></div>
                        <div className="text-xs text-white font-medium">Business Name</div>
                    </div>
                    <div className="p-4 space-y-2 min-h-[300px]">
                        <div className="bg-white rounded-lg p-2 rounded-tl-none shadow-sm max-w-[90%] text-sm text-slate-800">
                           {body || "Message preview..."}
                           <div className="text-[10px] text-slate-400 text-right mt-1">10:30 AM</div>
                        </div>
                    </div>
                </div>
           </div>
       </div>

       <DialogFooter className="p-4 border-t bg-white sm:justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit for Approval"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
