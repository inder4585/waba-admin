import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Loader2, GitGraph } from "lucide-react";
import { useState } from "react";
import CreateWabaNumberModal from "@/components/WabaNumbers/CreateWabaNumberModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wabaNumberService } from "@/services/wabaNumberService";
import { flowBuilderService } from "@/services/flowBuilderService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function WabaNumbers() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = "27601c68-8df0-454a-8d90-76a3d5b44fb0"; 
  
  const { data: numbers = [], isLoading: isLoadingNumbers } = useQuery({
    queryKey: ['wabaNumbers'],
    queryFn: wabaNumberService.getAll
  });

  const { data: flows = [], isLoading: isLoadingFlows } = useQuery({
    queryKey: ['flows'],
    queryFn: flowBuilderService.getAll
  });

  const createFlowMutation = useMutation({
      mutationFn: flowBuilderService.create,
      onSuccess: (data) => {
          toast.success("New flow created!");
          queryClient.invalidateQueries({ queryKey: ['flows'] });
          navigate(`/flow-builder/${data.data._id || data.data.id}`);
      },
      onError: (error: any) => {
          toast.error("Failed to create flow: " + (error.response?.data?.message || "Unknown error"));
      }
  });

  const handleOpenFlow = (numberObj: any) => {
      // Check if flow exists for this number
      // Assuming flow object has 'wabanumber' field matching numberObj.number
      const existingFlow = flows?.data?.find((f: any) => f.wabanumber === numberObj.number);

      if (existingFlow) {
          navigate(`/flow-builder/${existingFlow._id || existingFlow.id}`);
      } else {
          // Create new flow
          if(confirm("No flow exists for this number. Create one?")) {
              createFlowMutation.mutate({
                  name: `${numberObj.groupName} Flow`,
                  userId,
                  wabanumber: numberObj.number,
                  groupId: numberObj.groupId,
                  description: `Flow for ${numberObj.number}`,
                  nodes: [],
                  edges: []
              });
          }
      }
  };

  const filteredNumbers = Array.isArray(numbers?.data) ? numbers.data.filter((num: any) => 
    num.number?.includes(searchTerm) || num.groupName?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  if (isLoadingNumbers || isLoadingFlows) {
      return (
          <div className="flex items-center justify-center h-full min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
      )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">WABA Numbers</h1>
          <p className="text-slate-500 mt-2">Manage your connected WhatsApp numbers.</p>
        </div>
        <CreateWabaNumberModal /> 
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
                placeholder="Search numbers..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phone Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Quality Rating</TableHead>
              <TableHead>Assigned Group</TableHead>
              <TableHead>Flow</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNumbers.map((num: any) => (
              <TableRow key={num.id}>
                <TableCell className="font-medium">{num.number}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        {num.status === 'Connected' || true ? ( // Assuming default connected for now as status might not be in payload
                             <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        ) : (
                             <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                        )}
                        <span>{num.status || 'Connected'}</span>
                    </div>
                </TableCell>
                <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        (num.quality || 'High') === 'High' ? 'bg-green-100 text-green-800' :
                        (num.quality || 'High') === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {num.rating || num.quality || 'High'}
                    </span>
                </TableCell>
                <TableCell>{num.groupName}</TableCell>
                <TableCell>
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => handleOpenFlow(num)}
                        className="h-8 text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200"
                    >
                        <GitGraph className="mr-2 h-3 w-3" />
                         {flows?.data?.some((f: any) => f.wabanumber === num.number) ? "Edit Flow" : "Create Flow"}
                    </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4 text-slate-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredNumbers.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No numbers found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
