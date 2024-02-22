import { createI18n } from 'vue-i18n'
import uzLat from './uzLat'
import uzCyr from './uzCyr'
import ru from './ru'
import useCore from '@/store/core.pinia';

const i18nFactory = () => {
  const corePinia = useCore();
  return createI18n({
    legacy: false,
    locale: corePinia.locale,
    fallbackLocale: 'uzLat',
    messages: { uzLat, uzCyr, ru }
  })
}

export default i18nFactory
