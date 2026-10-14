import type { MenuIO, SizeId } from '../types/menu'

const MENU: MenuIO [] = [
  { id: 'chicken', label: 'Курица', gen: 'с курицей', sizes: { mini: 300, std: 340, vip: 400 }, addons: true },
  { id: 'pork', label: 'Свинина', gen: 'со свининой', sizes: { mini: 300, std: 340 }, addons: true },
  { id: 'beef', label: 'Мраморная говядина', gen: 'с мраморной говядиной', sizes: { std: 450 }, addons: true },
  { id: 'curry', label: 'Чикен Карри', gen: '«Чикен Карри»', sizes: { mini: 300, std: 340, vip: 400 }, addons: false },
];

export const SIZES: { id: SizeId; label: string; adj: string }[] = [
  { id: 'mini', label: 'Мини', adj: 'Мини' },
  { id: 'std', label: 'Стандарт', adj: 'Стандартная' },
  { id: 'vip', label: 'VIP', adj: 'VIP' },
];

export const HITS = [
  { note: '', name: 'Стандартная с мраморной говядиной', desc: 'Можно с сыром и картофелем фри', price: 450, photo: 'bg-marbled-beef' },
  { note: 'НОВИНКА', name: 'Стандарт «Чикен Карри»', desc: 'Есть в размерах мини и большая', price: 340, photo: 'bg-chicken-beef-curry' },
  { note: '', name: 'Стандартная с курицей и фри', desc: 'Курица, картофель фри внутри', price: 390, photo: 'bg-chicken-beef-fries' },
  { note: '', name: 'Мини со свининой', desc: 'Небольшой перекус', price: 300, photo: 'bg-pork-beef' },
];

export const CATEGORIES = ['Шаурма', 'Шашлык', 'Кебаб', 'Бургеры', 'Пицца', 'Хачапури', 'Закуски', 'Соусы', 'Напитки'];

export default MENU;