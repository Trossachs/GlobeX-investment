import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface RatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export function Rating({ rating, maxRating = 5, className }: RatingProps) {
  return (
    <div className={cn("flex", className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4 mr-0.5",
            i < rating ? "text-secondary fill-secondary" : "text-slate-300"
          )}
        />
      ))}
    </div>
  );
}

interface ReviewCardProps {
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  avatar: string;
  verified?: boolean;
  className?: string;
}

export function ReviewCard({
  name,
  rating,
  date,
  title,
  comment,
  avatar,
  verified = false,
  className,
}: ReviewCardProps) {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{name}</div>
              {verified && (
                <div className="flex items-center text-xs text-slate-500">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                  Verified Customer
                </div>
              )}
            </div>
          </div>
          <div className="text-xs text-slate-500">{date}</div>
        </div>
        <div className="mb-1">
          <Rating rating={rating} />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-slate-700 dark:text-slate-300">{comment}</p>
      </CardContent>
      <CardFooter className="pt-0 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <div className="text-xs text-slate-500">
          Review posted on Trustpilot
        </div>
      </CardFooter>
    </Card>
  );
}

interface TrustpilotRatingProps {
  averageRating: number;
  totalReviews: number;
  className?: string;
}

export function TrustpilotRating({ 
  averageRating, 
  totalReviews,
  className
}: TrustpilotRatingProps) {
  return (
    <div className={cn("flex flex-col items-center text-center px-4 py-3 bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-md", className)}>
      <div className="flex items-center mb-2">
        <img 
          src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-white-bg.svg" 
          alt="Trustpilot" 
          className="h-6 mr-2"
        />
      </div>
      <div className="flex items-center mb-2">
        <Rating rating={averageRating} className="mx-auto" />
        <span className="ml-2 font-semibold">{averageRating.toFixed(1)}</span>
      </div>
      <div className="text-xs text-slate-500">
        Based on {totalReviews} reviews
      </div>
    </div>
  );
}