import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { apiClient, PublicReview } from '@/lib/api';

interface ReviewsDisplayProps {
  title?: string;
  subtitle?: string;
  maxReviews?: number;
  showTitle?: boolean;
}

export default function ReviewsDisplay({ 
  title = "What Our Customers Say", 
  subtitle = "Read what our valued customers have to say about their experience",
  maxReviews = 6,
  showTitle = true 
}: ReviewsDisplayProps) {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getPublicReviews();
        // Limit the number of reviews displayed
        setReviews(data.slice(0, maxReviews));
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [maxReviews]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${
              i < rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            }`} 
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-4 text-foreground">{title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show section if no reviews
  }

  return (
    <section className="container mx-auto px-4 py-16">
      {showTitle && (
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-4 text-foreground">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6 card-shadow hover:elegant-shadow transition-all">
            <div className="space-y-4">
              {/* Quote icon */}
              <div className="flex items-start justify-between">
                <Quote className="h-8 w-8 text-accent opacity-60" />
                {renderStars(review.rating)}
              </div>
              
              {/* Review text */}
              <p className="text-foreground leading-relaxed">
                "{review.comment}"
              </p>
              
              {/* Author and date */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{review.authorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {error && (
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Showing sample reviews. {error}
          </p>
        </div>
      )}
    </section>
  );
}
