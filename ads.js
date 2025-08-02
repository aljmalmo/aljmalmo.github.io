/**
 * نظام إدارة الإعلانات
 * يمكن تخصيص الإعلانات من خلال تعديل المتغيرات أدناه
 */

// إعدادات الإعلانات
const AdsConfig = {
    // تفعيل/إلغاء تفعيل الإعلانات
    enabled: true,
    
    // أكواد الإعلانات - يمكن تعديلها حسب الحاجة
    ads: {
        headerAd: {
            enabled: true,
            code: `
                <div class="ad-container header-ad">
                    <div class="ad-label">إعلان</div>
                    <div class="ad-content">
                        <!-- ضع كود الإعلان هنا -->
                        <div class="sample-ad">
                            <h3>إعلان تحت الهيدر</h3>
                            <p>هذا مكان مخصص للإعلانات</p>
                        </div>
                    </div>
                </div>
            `
        },
        
        footerAd: {
            enabled: true,
            code: `
                <div class="ad-container footer-ad">
                    <div class="ad-label">إعلان</div>
                    <div class="ad-content">
                        <!-- ضع كود الإعلان هنا -->
                        <div class="sample-ad">
                            <h3>إعلان فوق الفوتر</h3>
                            <p>هذا مكان مخصص للإعلانات</p>
                        </div>
                    </div>
                </div>
            `
        },
        
        articleTopAd: {
            enabled: true,
            code: `
                <div class="ad-container article-top-ad">
                    <div class="ad-label">إعلان</div>
                    <div class="ad-content">
                        <!-- ضع كود الإعلان هنا -->
                        <div class="sample-ad">
                            <h3>إعلان أعلى المقال</h3>
                            <p>هذا مكان مخصص للإعلانات</p>
                        </div>
                    </div>
                </div>
            `
        },
        
        articleMiddleAd: {
            enabled: true,
            code: `
                <div class="ad-container article-middle-ad">
                    <div class="ad-label">إعلان</div>
                    <div class="ad-content">
                        <!-- ضع كود الإعلان هنا -->
                        <div class="sample-ad">
                            <h3>إعلان وسط المقال</h3>
                            <p>هذا مكان مخصص للإعلانات</p>
                        </div>
                    </div>
                </div>
            `
        },
        
        articleBottomAd: {
            enabled: true,
            code: `
                <div class="ad-container article-bottom-ad">
                    <div class="ad-label">إعلان</div>
                    <div class="ad-content">
                        <!-- ضع كود الإعلان هنا -->
                        <div class="sample-ad">
                            <h3>إعلان أسفل المقال</h3>
                            <p>هذا مكان مخصص للإعلانات</p>
                        </div>
                    </div>
                </div>
            `
        }
    }
};

// فئة إدارة الإعلانات
class AdsManager {
    constructor() {
        this.config = AdsConfig;
        this.init();
    }
    
    init() {
        if (!this.config.enabled) {
            return;
        }
        
        // تحميل أنماط CSS للإعلانات
        this.loadAdStyles();
        
        // إضافة الإعلانات عند تحميل الصفحة
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.insertAds());
        } else {
            this.insertAds();
        }
    }
    
    loadAdStyles() {
        const styles = `
            .ad-container {
                margin: 2rem 0;
                padding: 1rem;
                background: var(--bg-secondary, #f9fafb);
                border: 1px solid var(--border-color, #e5e7eb);
                border-radius: var(--radius-lg, 0.75rem);
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            
            .ad-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            }
            
            .ad-label {
                font-size: 0.75rem;
                color: var(--text-light, #9ca3af);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 0.5rem;
                font-weight: 600;
            }
            
            .ad-content {
                min-height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .sample-ad {
                padding: 1rem;
                background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
                border-radius: var(--radius-md, 0.5rem);
                border: 2px dashed var(--border-color, #d1d5db);
            }
            
            .sample-ad h3 {
                margin: 0 0 0.5rem 0;
                color: var(--text-primary, #1f2937);
                font-size: 1.125rem;
            }
            
            .sample-ad p {
                margin: 0;
                color: var(--text-secondary, #6b7280);
                font-size: 0.875rem;
            }
            
            .header-ad {
                margin-top: 1rem;
                margin-bottom: 2rem;
            }
            
            .footer-ad {
                margin-top: 2rem;
                margin-bottom: 1rem;
            }
            
            .article-top-ad {
                margin-bottom: 2rem;
            }
            
            .article-middle-ad {
                margin: 3rem 0;
            }
            
            .article-bottom-ad {
                margin-top: 2rem;
            }
            
            @media (max-width: 768px) {
                .ad-container {
                    margin: 1rem 0;
                    padding: 0.75rem;
                }
                
                .ad-content {
                    min-height: 80px;
                }
                
                .sample-ad h3 {
                    font-size: 1rem;
                }
                
                .sample-ad p {
                    font-size: 0.8rem;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    insertAds() {
        // إعلان تحت الهيدر
        this.insertHeaderAd();
        
        // إعلان فوق الفوتر
        this.insertFooterAd();
        
        // إعلانات المقالات (إذا كانت الصفحة تحتوي على مقال)
        this.insertArticleAds();
    }
    
    insertHeaderAd() {
        if (!this.config.ads.headerAd.enabled) return;
        
        const header = document.querySelector('.main-header');
        const mainContent = document.querySelector('.main-content');
        
        if (header && mainContent) {
            const adElement = this.createAdElement(this.config.ads.headerAd.code);
            header.insertAdjacentElement('afterend', adElement);
        }
    }
    
    insertFooterAd() {
        if (!this.config.ads.footerAd.enabled) return;
        
        const footer = document.querySelector('.main-footer');
        
        if (footer) {
            const adElement = this.createAdElement(this.config.ads.footerAd.code);
            footer.insertAdjacentElement('beforebegin', adElement);
        }
    }
    
    insertArticleAds() {
        const articleContent = document.querySelector('.article-content');
        
        if (!articleContent) return;
        
        // إعلان أعلى المقال
        if (this.config.ads.articleTopAd.enabled) {
            const topAdElement = this.createAdElement(this.config.ads.articleTopAd.code);
            articleContent.insertAdjacentElement('beforebegin', topAdElement);
        }
        
        // إعلان وسط المقال
        if (this.config.ads.articleMiddleAd.enabled) {
            const paragraphs = articleContent.querySelectorAll('p');
            const middleIndex = Math.floor(paragraphs.length / 2);
            
            if (paragraphs[middleIndex]) {
                const middleAdElement = this.createAdElement(this.config.ads.articleMiddleAd.code);
                paragraphs[middleIndex].insertAdjacentElement('afterend', middleAdElement);
            }
        }
        
        // إعلان أسفل المقال
        if (this.config.ads.articleBottomAd.enabled) {
            const bottomAdElement = this.createAdElement(this.config.ads.articleBottomAd.code);
            articleContent.insertAdjacentElement('afterend', bottomAdElement);
        }
    }
    
    createAdElement(htmlCode) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = htmlCode;
        return wrapper.firstElementChild;
    }
    
    // دالة لتحديث إعلان معين
    updateAd(adType, newCode) {
        if (this.config.ads[adType]) {
            this.config.ads[adType].code = newCode;
            
            // إزالة الإعلان القديم وإضافة الجديد
            const oldAd = document.querySelector(`.${adType.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            if (oldAd) {
                const newAdElement = this.createAdElement(newCode);
                oldAd.replaceWith(newAdElement);
            }
        }
    }
    
    // دالة لتفعيل/إلغاء تفعيل إعلان معين
    toggleAd(adType, enabled) {
        if (this.config.ads[adType]) {
            this.config.ads[adType].enabled = enabled;
            
            const adElement = document.querySelector(`.${adType.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            if (adElement) {
                adElement.style.display = enabled ? 'block' : 'none';
            }
        }
    }
    
    // دالة لإزالة جميع الإعلانات
    removeAllAds() {
        const allAds = document.querySelectorAll('.ad-container');
        allAds.forEach(ad => ad.remove());
    }
}

// تصدير الفئة للاستخدام العام
window.AdsManager = AdsManager;

// إنشاء مثيل من مدير الإعلانات
window.adsManager = new AdsManager();

// دوال مساعدة للاستخدام السريع
window.updateAd = (adType, newCode) => window.adsManager.updateAd(adType, newCode);
window.toggleAd = (adType, enabled) => window.adsManager.toggleAd(adType, enabled);
window.removeAllAds = () => window.adsManager.removeAllAds();

