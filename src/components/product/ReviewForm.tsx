import React, { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { title } from 'process';

interface ReviewFormProps {
  productId: string;
  onSuccess: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSuccess }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await api.post('/reviews', {
        product: { id: productId },
        rating,
        comment,
        title:"title"
      });
      setSuccess(true);
      setComment('');
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err: any) {
      console.error('Failed to submit review:', err);
      setError(err.response?.data?.message || t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 text-center border border-dashed border-gray-300">
        <p className="text-gray-600 mb-4">{t('review.login_to_review')}</p>
        <button 
          onClick={() => window.location.href = '/login'}
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
        >
          {t('nav.sign_in')}
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-100 animate-in fade-in duration-500">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Star className="text-green-600 fill-green-600" size={24} />
        </div>
        <h4 className="text-green-900 font-bold text-lg mb-1">{t('common.success')}</h4>
        <p className="text-green-700">{t('review.success_pending')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{t('review.rating')}</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 transition-transform active:scale-90"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={32}
                className={`${
                  (hover || rating) >= star 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-200 fill-transparent'
                } transition-colors duration-200`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm font-medium text-gray-400">
            {rating} {t('review.stars')}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          {t('review.comment')}
        </label>
        <textarea
          id="comment"
          rows={4}
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('review.write_review')}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-red-600 animate-in slide-in-from-top-1">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center w-full gap-2 bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            <Send size={18} />
            {t('review.submit')}
          </>
        )}
      </button>
    </form>
  );
};

export default ReviewForm;
