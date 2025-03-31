import { useState, useCallback } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

interface PurchaseModalProps {
  product: Product;
  onClose: () => void;
}

interface FormErrors {
  [key: string]: string;
}

export default function PurchaseModal({ product, onClose }: PurchaseModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    city: '',
    comment: '',
    shippingMethod: 'novaposhta',
    branch: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Будь ласка, введіть ваше ім'я";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Будь ласка, введіть номер телефону';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Невірний формат номера телефону';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Будь ласка, введіть електронну пошту';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Невірний формат електронної пошти';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Будь ласка, введіть місто';
    }

    if (!formData.branch.trim()) {
      newErrors.branch = 'Будь ласка, введіть відділення';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      throw new Error('reCAPTCHA не ініціалізована');
    }

    try {
      const token = await executeRecaptcha('purchase');
      if (!token) {
        throw new Error('Не вдалося отримати токен reCAPTCHA');
      }
      return token;
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      throw new Error('Помилка перевірки reCAPTCHA');
    }
  }, [executeRecaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await handleReCaptchaVerify();

      const emailParams = {
        to_email: 'csgo.user762@gmail.com',
        from_name: formData.fullName,
        message: `
          Нове замовлення:
          Товар: ${product.name}
          Ціна: ${product.price} грн
          
          Дані покупця:
          Ім'я: ${formData.fullName}
          Телефон: ${formData.phoneNumber}
          Email: ${formData.email}
          Місто: ${formData.city}
          Спосіб доставки: ${formData.shippingMethod === 'novaposhta' ? 'Нова Пошта' : 'Укрпошта'}
          Відділення: ${formData.branch}
          Коментар: ${formData.comment || 'Не вказано'}
        `,
        reply_to: formData.email
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        emailParams,
        'YOUR_PUBLIC_KEY'
      );

      toast.success('Дякуємо! Ваше замовлення успішно оформлене. Ми зв\'яжемося з вами найближчим часом.');
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Сталася помилка при оформленні замовлення';
      toast.error(errorMessage);
      console.error('Помилка:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Оформлення замовлення</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ім'я
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Номер телефону
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Електронна пошта
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Місто
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Спосіб доставки
            </label>
            <select
              value={formData.shippingMethod}
              onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value as 'ukrposhta' | 'novaposhta' })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 border-gray-300"
            >
              <option value="novaposhta">Нова Пошта</option>
              <option value="ukrposhta">Укрпошта</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Номер відділення
            </label>
            <input
              type="text"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 ${
                errors.branch ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.branch && (
              <p className="text-red-500 text-sm mt-1">{errors.branch}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Коментар до замовлення (необов'язково)
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 border-gray-300"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:bg-pink-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Оформлення...
              </>
            ) : (
              'Оформити замовлення'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}