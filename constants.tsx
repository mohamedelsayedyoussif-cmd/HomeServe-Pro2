
import React from 'react';
import { Wrench, Zap, Wind, Droplets, Home, Paintbrush, Hammer, Eraser } from 'lucide-react';
import { Service, Review, FAQItem } from './types';

export const COLORS = {
  primary: '#1e40af', // Blue
  secondary: '#f97316', // Orange
  accent: '#10b981', // Green
};

export const SERVICES: Service[] = [
  {
    id: 'plumbing',
    title: 'سباكة',
    icon: <Droplets className="w-8 h-8" />,
    description: 'تسريب، تركيب خلاطات، أو صيانة حمامات كاملة.',
    priceStart: 150
  },
  {
    id: 'electricity',
    title: 'كهرباء',
    icon: <Zap className="w-8 h-8" />,
    description: 'تركيب نجف، صيانة لوحات، أو إصلاح أعطال مفاجئة.',
    priceStart: 120
  },
  {
    id: 'ac',
    title: 'تكييف',
    icon: <Wind className="w-8 h-8" />,
    description: 'تنظيف، شحن فريون، أو فك وتركيب بأعلى دقة.',
    priceStart: 250
  },
  {
    id: 'cleaning',
    title: 'تنظيف',
    icon: <Eraser className="w-8 h-8" />,
    description: 'تنظيف عميق للشقق، السجاد، أو الانتريهات.',
    priceStart: 300
  },
  {
    id: 'painting',
    title: 'دهان',
    icon: <Paintbrush className="w-8 h-8" />,
    description: 'تجديد دهانات الحوائط بأفضل الخامات العالمية.',
    priceStart: 500
  },
  {
    id: 'carpentry',
    title: 'نجارة',
    icon: <Hammer className="w-8 h-8" />,
    description: 'تصليح أثاث، تركيب أبواب، أو غرف نوم.',
    priceStart: 200
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: 'أحمد محمد',
    content: 'بصراحة الفني وصل في ميعاده بالثانية والخدمة كانت ممتازة. السباك كان فاهم جداً وحل مشكلة التسريب في نص ساعة.',
    rating: 5,
    date: 'منذ يومين'
  },
  {
    id: 2,
    author: 'سارة إبراهيم',
    content: 'جربت خدمة تنظيف التكييف، الشغل كان نظيف جداً والسعر كان زي ما اتكتب في التطبيق بالظبط بدون زيادة.',
    rating: 5,
    date: 'منذ أسبوع'
  },
  {
    id: 3,
    author: 'محمود علي',
    content: 'التطبيق سهل جداً في الحجز. ميزة الضمان الـ 30 يوم بتخلي الواحد مطمن وهو بيدخل فني بيته.',
    rating: 4,
    date: 'منذ 3 أيام'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'إزاي أضمن جودة شغل الفني؟',
    answer: 'كل الفنيين عندنا بيعدوا باختبارات فنية وفحص خلفية جنائية، بالإضافة إننا بنوفر ضمان 30 يوم على أي خدمة بتتم من خلالنا.'
  },
  {
    question: 'هل الأسعار ثابتة ولا بتتغير؟',
    answer: 'إحنا بنوفر تسعير شفاف ومحدد مسبقاً لأغلب الخدمات. لو فيه شغل إضافي، الفني بيبلغك بالتكلفة قبل ما يبدأ.'
  },
  {
    question: 'الفني بيوصل في قد إيه؟',
    answer: 'في حالات الطوارئ بنحاول نوصلك فني في خلال 30 دقيقة. وللخدمات العادية تقدر تحدد الميعاد اللي يناسبك.'
  }
];
