import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, AlertCircle } from "lucide-react";

interface VerificationBadgeProps {
  isVerified?: boolean;
  linkHealth?: 'healthy' | 'warning' | 'broken';
  className?: string;
}

export function VerificationBadge({ 
  isVerified, 
  linkHealth = 'healthy', 
  className = '' 
}: VerificationBadgeProps) {
  if (!isVerified && linkHealth === 'healthy') {
    return null;
  }

  if (isVerified) {
    return (
      <Badge
        variant="outline"
        className={`bg-green-500/20 text-green-400 border-green-500/30 ${className} flex items-center gap-1 text-xs`}
      >
        <CheckCircle className="w-3 h-3" />
        Verified
      </Badge>
    );
  }

  if (linkHealth === 'warning') {
    return (
      <Badge
        variant="outline"
        className={`bg-yellow-500/20 text-yellow-400 border-yellow-500/30 ${className} flex items-center gap-1 text-xs`}
      >
        <AlertCircle className="w-3 h-3" />
        Check Link
      </Badge>
    );
  }

  if (linkHealth === 'broken') {
    return (
      <Badge
        variant="outline"
        className={`bg-red-500/20 text-red-400 border-red-500/30 ${className} flex items-center gap-1 text-xs`}
      >
        <AlertCircle className="w-3 h-3" />
        Link Issue
      </Badge>
    );
  }

  return null;
}