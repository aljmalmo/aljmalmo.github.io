# دليل التخصيص التفصيلي

## جدول المحتويات
1. [تخصيص الألوان والخطوط](#تخصيص-الألوان-والخطوط)
2. [تحديث المحتوى النصي](#تحديث-المحتوى-النصي)
3. [إضافة وتعديل الخدمات](#إضافة-وتعديل-الخدمات)
4. [إدارة معرض الأعمال](#إدارة-معرض-الأعمال)
5. [تخصيص الأسعار](#تخصيص-الأسعار)
6. [إدارة الشهادات](#إدارة-الشهادات)
7. [تحديث معلومات الاتصال](#تحديث-معلومات-الاتصال)
8. [إعدادات متقدمة](#إعدادات-متقدمة)

---

## تخصيص الألوان والخطوط

### تغيير نظام الألوان

في ملف `styles.css`، ابحث عن القسم التالي في بداية الملف:

```css
:root {
  /* Colors */
  --primary-color: #1e3a8a;      /* اللون الأساسي - أزرق داكن */
  --secondary-color: #f8fafc;    /* اللون الثانوي - رمادي فاتح */
  --accent-color: #0d9488;       /* اللون المميز - أزرق مخضر */
  --accent-hover: #14b8a6;       /* لون التمرير */
  --text-color: #334155;         /* لون النص الأساسي */
  --text-secondary: #64748b;     /* لون النص الثانوي */
  --white-color: #ffffff;        /* الأبيض */
  --white-cream: #fefefe;        /* الأبيض الكريمي */
}
```

#### أمثلة على أنظمة ألوان مختلفة:

**نظام ألوان أخضر:**
```css
:root {
  --primary-color: #065f46;      /* أخضر داكن */
  --accent-color: #059669;       /* أخضر مميز */
  --accent-hover: #10b981;       /* أخضر فاتح */
}
```

**نظام ألوان بنفسجي:**
```css
:root {
  --primary-color: #581c87;      /* بنفسجي داكن */
  --accent-color: #7c3aed;       /* بنفسجي مميز */
  --accent-hover: #8b5cf6;       /* بنفسجي فاتح */
}
```

### تغيير الخطوط

```css
:root {
  /* Typography */
  --font-arabic: 'Cairo', 'Tajawal', sans-serif;
  --font-english: 'Inter', 'Roboto', sans-serif;
}
```

#### خطوط عربية بديلة:
- **Amiri**: للنصوص الكلاسيكية
- **Noto Sans Arabic**: خط حديث ونظيف
- **Almarai**: خط عصري وأنيق
- **Changa**: خط جريء ومميز

لإضافة خط جديد، أضف الرابط في `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet">
```

---

## تحديث المحتوى النصي

### 1. تحديث اسم الموقع والعناوين

في ملف `index.html`، ابحث عن:

```html
<!-- في الرأس -->
<div class="nav__logo">
    <h3>اسم صاحب الموقع</h3> <!-- غير هذا -->
</div>

<!-- في القسم الرئيسي -->
<h1 class="hero__title">
    مرحباً، أنا <span class="hero__title-accent">متخصص رقمي</span>
    <br>متعدد المهارات
</h1>
```

### 2. تحديث الوصف الشخصي

```html
<p class="hero__description">
    أقدم خدمات رقمية احترافية متعددة بجودة عالية وأسعار مناسبة. 
    من الكتابة الاحترافية إلى إدارة صفحات التواصل الاجتماعي، 
    أساعدك في تحقيق أهدافك الرقمية بكفاءة واحترافية.
</p>
```

### 3. تحديث عناوين الأقسام

```html
<!-- قسم الخدمات -->
<h2 class="section__title">خدماتي</h2>
<p class="section__subtitle">
    مجموعة شاملة من الخدمات الرقمية المصممة لتلبية احتياجاتك
</p>
```

---

## إضافة وتعديل الخدمات

### إضافة خدمة جديدة

انسخ هذا الكود وأضفه في قسم الخدمات:

```html
<div class="service__card">
    <div class="service__icon">
        <i class="fas fa-icon-name"></i> <!-- غير الأيقونة -->
    </div>
    <h3 class="service__title">عنوان الخدمة</h3>
    <p class="service__description">
        وصف تفصيلي للخدمة وما تتضمنه من مميزات وفوائد للعميل.
    </p>
    <div class="service__price">
        <span class="service__price-text">يبدأ من</span>
        <span class="service__price-amount">$XX</span>
    </div>
    <a href="#contact" class="service__btn">اطلب الآن</a>
</div>
```

### أيقونات Font Awesome شائعة للخدمات:

- `fa-pen-fancy`: الكتابة
- `fa-file-excel`: Excel/Office
- `fa-search`: SEO
- `fa-dollar-sign`: الإعلانات
- `fa-facebook`: وسائل التواصل
- `fa-user-tie`: السيرة الذاتية
- `fa-code`: البرمجة
- `fa-paint-brush`: التصميم
- `fa-camera`: التصوير
- `fa-video`: المونتاج

### تحديث قائمة الخدمات في النموذج

في نموذج الاتصال، أضف الخدمة الجديدة:

```html
<select id="service" name="service" class="contact__input" required>
    <option value="">اختر الخدمة</option>
    <option value="writing">الكتابة الاحترافية</option>
    <option value="office">خبرة مايكروسوفت أوفيس</option>
    <option value="new_service">الخدمة الجديدة</option> <!-- أضف هنا -->
    <!-- باقي الخدمات -->
</select>
```

وفي ملف `script.js`، حدث دالة `getServiceName()`:

```javascript
function getServiceName(serviceValue) {
    const services = {
        'writing': 'الكتابة الاحترافية',
        'office': 'خبرة مايكروسوفت أوفيس',
        'new_service': 'اسم الخدمة الجديدة', // أضف هنا
        // باقي الخدمات
    };
    return services[serviceValue] || serviceValue;
}
```

---

## إدارة معرض الأعمال

### إضافة مشروع جديد

```html
<div class="portfolio__item">
    <div class="portfolio__image">
        <img src="assets/portfolio-new.jpg" alt="وصف المشروع" class="portfolio__img">
        <div class="portfolio__overlay">
            <div class="portfolio__content">
                <h3 class="portfolio__title">عنوان المشروع</h3>
                <p class="portfolio__description">
                    وصف موجز للمشروع والتقنيات المستخدمة
                </p>
                <div class="portfolio__buttons">
                    <a href="#" class="portfolio__btn">
                        <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="#" class="portfolio__btn">
                        <i class="fas fa-download"></i> تحميل
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
```

### مواصفات الصور المطلوبة:
- **الحجم**: 600x400 بكسل
- **التنسيق**: JPG أو PNG
- **الحجم**: أقل من 500KB
- **الجودة**: عالية ووضوح جيد

---

## تخصيص الأسعار

### تعديل باقة موجودة

```html
<div class="pricing__card">
    <div class="pricing__header">
        <h3 class="pricing__title">اسم الباقة</h3>
        <div class="pricing__price">
            <span class="pricing__currency">$</span>
            <span class="pricing__amount">99</span>
            <span class="pricing__period">/شهرياً</span>
        </div>
    </div>
    <ul class="pricing__features">
        <li class="pricing__feature">
            <i class="fas fa-check"></i>
            ميزة رقم 1
        </li>
        <li class="pricing__feature">
            <i class="fas fa-check"></i>
            ميزة رقم 2
        </li>
        <!-- أضف المزيد من الميزات -->
    </ul>
    <a href="#contact" class="pricing__btn">اختر هذه الباقة</a>
</div>
```

### إضافة شارة "الأكثر شعبية"

```html
<div class="pricing__card pricing__card--featured">
    <div class="pricing__badge">الأكثر شعبية</div>
    <!-- باقي محتوى البطاقة -->
</div>
```

---

## إدارة الشهادات

### إضافة شهادة جديدة

```html
<div class="testimonial__card swiper-slide">
    <div class="testimonial__content">
        <div class="testimonial__stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </div>
        <p class="testimonial__text">
            "نص الشهادة والتجربة مع الخدمة المقدمة..."
        </p>
        <div class="testimonial__author">
            <img src="assets/client-new.jpg" alt="اسم العميل" class="testimonial__img">
            <div class="testimonial__info">
                <h4 class="testimonial__name">اسم العميل</h4>
                <span class="testimonial__position">المنصب أو الشركة</span>
            </div>
        </div>
    </div>
</div>
```

### مواصفات صور العملاء:
- **الحجم**: 200x200 بكسل
- **الشكل**: مربع
- **التنسيق**: JPG
- **الحجم**: أقل من 100KB

---

## تحديث معلومات الاتصال

### 1. معلومات الاتصال الأساسية

```html
<!-- في قسم الاتصال -->
<div class="contact__info-content">
    <h4>البريد الإلكتروني</h4>
    <p>your.email@example.com</p> <!-- غير هذا -->
</div>

<div class="contact__info-content">
    <h4>واتساب</h4>
    <p>+1234567890</p> <!-- غير هذا -->
</div>
```

### 2. الأزرار الثابتة

```html
<div class="fixed-contact">
    <a href="https://wa.me/1234567890" class="fixed-contact__btn fixed-contact__whatsapp" target="_blank">
        <i class="fab fa-whatsapp"></i>
    </a>
    <a href="https://t.me/yourusername" class="fixed-contact__btn fixed-contact__telegram" target="_blank">
        <i class="fab fa-telegram"></i>
    </a>
</div>
```

### 3. روابط وسائل التواصل الاجتماعي

```html
<div class="contact__social-links">
    <a href="https://facebook.com/yourpage" class="contact__social-link">
        <i class="fab fa-facebook"></i>
    </a>
    <a href="https://linkedin.com/in/yourprofile" class="contact__social-link">
        <i class="fab fa-linkedin"></i>
    </a>
    <a href="https://instagram.com/yourusername" class="contact__social-link">
        <i class="fab fa-instagram"></i>
    </a>
    <a href="https://t.me/yourusername" class="contact__social-link">
        <i class="fab fa-telegram"></i>
    </a>
</div>
```

---

## إعدادات متقدمة

### 1. تخصيص الحركات والتأثيرات

في ملف `script.js`، يمكنك تعديل إعدادات AOS:

```javascript
AOS.init({
    duration: 1000,        // مدة الحركة بالميلي ثانية
    easing: 'ease-in-out', // نوع الحركة
    once: true,            // تشغيل الحركة مرة واحدة فقط
    mirror: false,         // عدم تكرار الحركة عند التمرير للأعلى
    offset: 100            // المسافة قبل بدء الحركة
});
```

### 2. تخصيص شريط التمرير للشهادات

```javascript
let testimonialsSwiper = new Swiper('.testimonials__container', {
    spaceBetween: 24,      // المسافة بين الشرائح
    loop: true,            // التكرار اللانهائي
    grabCursor: true,      // تغيير شكل المؤشر
    autoplay: {
        delay: 4000,       // التأخير بين الشرائح (4 ثوان)
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
```

### 3. إضافة Google Analytics

أضف هذا الكود قبل إغلاق `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 4. إضافة Facebook Pixel

```html
<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### 5. تحسين السرعة

#### ضغط الصور:
- استخدم أدوات مثل TinyPNG
- حول الصور إلى تنسيق WebP
- استخدم أحجام مناسبة

#### تصغير الملفات:
- استخدم أدوات تصغير CSS و JavaScript
- احذف التعليقات والمسافات الزائدة
- ادمج الملفات عند الإمكان

### 6. إضافة Schema Markup

أضف هذا في `<head>` لتحسين SEO:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "اسمك",
  "jobTitle": "متخصص رقمي",
  "description": "وصف مختصر عنك",
  "url": "https://yourwebsite.com",
  "sameAs": [
    "https://facebook.com/yourpage",
    "https://linkedin.com/in/yourprofile"
  ]
}
</script>
```

---

## نصائح للتخصيص الناجح

### 1. اختبر التغييرات
- اختبر الموقع على أجهزة مختلفة
- تأكد من عمل جميع الروابط
- اختبر النماذج والتفاعلات

### 2. احتفظ بنسخة احتياطية
- احفظ نسخة من الملفات الأصلية
- استخدم نظام إدارة الإصدارات مثل Git

### 3. اتبع أفضل الممارسات
- استخدم أسماء ملفات واضحة
- اكتب تعليقات في الكود
- حافظ على تنظيم الملفات

### 4. اختبر الأداء
- استخدم Google PageSpeed Insights
- اختبر سرعة التحميل
- تأكد من التوافق مع المتصفحات

---

هذا الدليل يغطي معظم جوانب التخصيص. إذا كنت بحاجة إلى مساعدة إضافية أو تخصيصات متقدمة، لا تتردد في التواصل!

