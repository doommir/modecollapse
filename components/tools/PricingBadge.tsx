import { Badge } from "@/components/ui/badge";
import { PricingModel } from "@/types";
import { DollarSign, Gift, Github, Code, Zap } from "lucide-react";

interface PricingBadgeProps {
  pricingModel: PricingModel;
  className?: string;
  showIcon?: boolean;
}

const pricingConfig = {
  'Free': {
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: Gift,
    label: 'Free'
  },
  'Freemium': {
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: Zap,
    label: 'Freemium'
  },
  'Paid': {
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    icon: DollarSign,
    label: 'Paid'
  },
  'Open Source': {
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    icon: Code,
    label: 'Open Source'
  },
  'GitHub': {
    color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    icon: Github,
    label: 'GitHub'
  },
  'Google Colab': {
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: Code,
    label: 'Colab'
  }
} as const;

export function PricingBadge({ pricingModel, className = '', showIcon = false }: PricingBadgeProps) {
  const config = pricingConfig[pricingModel];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`${config.color} ${className} flex items-center gap-1 text-xs font-medium`}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </Badge>
  );
}