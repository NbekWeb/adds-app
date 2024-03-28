import DashboardOrderListView from '@/pages/dashboard/order/DashboardOrderListView.vue'

const uzLat = {
  // menus
  AuthView: 'Tizimga kirish',
  DashboardListView: 'Asosiy sahifa',
  DashboardBoardListView: 'Kanallar',
  DashboardMyBoardListView: 'Mening kanallarim',
  DashboardKioskBoardListView: 'Kiosk boards',
  DashboardMyKioskBoardListView: 'My kiosk boards',
  DashboardPostListView: "E'lonlar",
  DashboardOrderListView: 'Xaridlar',
  ReportView: "E'lon bo'yicha hisobot",
  DashboardUserListView: 'Auditoriya',
  DashboardPaymentListView: "To'lovlar",
  BillingView: "Billing va to'lovlar",
  DashboardSettingsView: 'Sozlamalar',
  BoardConfigurationsView: "Ta'riflar",
  Help: 'Yordam',
  News: 'Xabar va yangilik',
  Settings: 'Sozlamalar',
  LogOut: 'Tizimdan chiqish',
  AddBoardView: "Kanal qo'shish",
  EditBoardView: 'Kanalni tahrirlash',
  DashboardUserEditView: 'Foydalanuvchini tahrirlash',
  DashboardPostFormView: "Post qo'shish",
  DashboardNotFond: 'Sahifa topilmadi',

  //   validations
  REQUIRED_FIELD: 'Majburiy maydon',
  REQUIRED_PHONE_NUMBER: "Telefon raqam to'liq kiritilishi shart!",
  REQUIRED_CODE: 'Kodni kiriting',
  ENTER_THE_COMPLETE_CODE: "Kodni to'liq kiriting",
  VALUE_MUST_BE_GREATER_THEN_ZERO: "Qiymat noldan katta bo'lishi kerak",
  // titles
  ADD_NEW_CONFIGURATION: "Yangi ta'rif qo'shish",
  ADD_NEW_TIME_CONFIGURATION: "Yangi vaqt qo'shish",
  BOARD_CONFIGURATIONS: 'Configurations',
  BOARD_TIME_CONFIGURATIONS: 'Time configurations',
  ADMINISTRATOR: 'Administrator',

  //   buttons
  YES: 'Ha',
  NO: "Yo'q",
  SAVE: 'Saqlash',
  BACK: 'Orqaga',
  ADD: "Qo'shish",
  CANCEL: 'Bekor qilish',
  CHANGE_PHONE_NUMBER: "Raqamni o'zgartirish",
  RESEND_THE_CODE: 'Kodni qayta yuborish',
  ENTER: 'Kirish',
  SEND_SMS_CODE: 'Sms kodni olish',
  REGISTER: "Ro'yxatdan o'tish",
  ADD_NEW_LINKED_BUTTON: "Yangi tugma qo'shish",
  //   labels
  ENTER_TEXT_LINKED_BUTTON: 'Tugma matnini kiriting',
  ENTER_URL: 'Havola kiriting',
  ATTACH_URL: 'Havola biriktirish',
  SELECT_STATUS: 'Holatini tanlang',
  STATUS: 'Holati',
  HOUR: 'Soat',
  MINUTE: 'Daqiqa',
  ENTER_SMS_CODE: 'Sms kodni kiriting',
  PHONE_NUMBER: 'Telefon raqam',
  F_I_O: 'F.I.O',
  FIRST_NAME: 'Ism',
  LAST_NAME: 'Familiya',
  CHANNEL_LINK: 'Kanal havolasi',
  CHANNEL_NAME: 'Kanal nomi',
  RATE_NAME: "Ta'rif nomi",
  ENTER_RATE_NAME: "Ta'rif nomini kiriting",
  LIVE_TIME: 'Muddati',
  TOP_TIME: 'Top muddati',
  PIN_TIME: 'Pin muddati',
  START_TIME: 'Boshlanish muddati',
  END_TIME: 'Tugash muddati',
  AMOUNT: 'Narxi',
  CATEGORY: 'Kategoriya',
  SELECT_CATEGORY: 'Kategoriyani tanlang',
  DESCRIPTION: 'Tavsif',
  WRITE_DESCRIPTION: 'Tavsif yozing...',
  ENTER_CHANNEL_NAME: 'Kanal nomini kiriting',
  ENTER_CHANNEL_LINK: 'Kanal havolasini kiriting',
  ENTER_YOUR_FULL_NAME: 'F.I.Oni kiriting',
  ENTER_YOUR_LAST_NAME: 'Familiyangizni kiriting',
  CLICK_TO_UPLOAD_FILE: 'Fayl yuklash uchun bosing',

  // statuses

  PENDING: 'Kutilmoqda',
  SUCCESS: 'Muvoffaqiyatli',
  CANCELED: 'Bekor qilingan',
  // descriptions
  LOGIN_PAGE_DESCRIPTION:
    'Biznes uchun reklamalarni joylashtirish, boshqarish uchun platforma.',
  ENTER_YOUR_NUMBER_TO_LOGIN: 'Tizimga kirish uchun raqamingizni kiriting',
  REGISTER_TO_USE_THE_SYSTEM: "Tizimdan foydalanish uchun ro'yxatdan o'ting",
  AN_SMS_CODE_WAS_SENT_TO_NUMBER: 'raqamga sms kod yuborildi',
  // An SMS code was sent to number 3
  //   notificitions
  NO_DATA: "Ma'lumot mavjud emas!",
  DO_YOU_WANT_TO_DELETE_THE_USER: "Foydalanuvchini o'chirishni xoxlaysizmi?",
  YOU_MUST_AGREE_TO_THE_OFFER_TO_REGISTER:
    "Ro'yxatdan o'tish uchun oferta ga rozilik bildirishingiz shart",
  CHANNEL_UPDATED_SUCCESSFULLY: 'Kanal muvafaqiyatli yangilandi',
  CHANNEL_ADDED_SUCCESSFULLY: "Kanal muvafaqiyatli qo'shildi",
  CHANNEL_DELETED_SUCCESSFULLY: "Kanal muvafaqiyatli o'chirildi",
  BOARD_CONFIGURATION_ADDED_SUCCESSFULLY: "Ta'rif muvafaqiyatli qo'shildi",
  BOARD_TIME_CONFIGURATION_ADDED_SUCCESSFULLY: "Ta'rif muvafaqiyatli qo'shildi",
  BOARD_CONFIGURATION_DELETED_SUCCESSFULLY: "Ta'rif muvafaqiyatli o'chirildi",
  BOARD_TIME_CONFIGURATION_DELETED_SUCCESSFULLY:
    "Ta'rif muvafaqiyatli o'chirildi",
  POST_ADDED_SUCCESSFULLY: "Post muvafaqiyatli qo'shildi",
  POST_DELETED_SUCCESSFULLY: "Post muvafaqiyatli o'chirildi",
  DOU_YOU_WANT_TO_LOG_OUT: 'Tizimdan chiqmoqchimisiz?',
  INTERNAL_SERVER_ERROR:
    "Server bilan bog'liq hatolik. Tizim administratoriga murojaat qiling!",
  ERROR: 'Xatolik!'
}

export default uzLat
