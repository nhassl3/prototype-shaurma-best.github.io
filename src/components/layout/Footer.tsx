import { FaTelegramPlane, FaVk } from "react-icons/fa"


const policy = 'https://shaurma-best.ru/doc/Personal_Data_Policy.pdf';

const RESTAURANT_ADDRESSES = [
	{ href: 'https://yandex.ru/maps/-/CXuxbQOG', label: 'площадь Максима Горького, 1'},
	{ href: 'https://yandex.ru/maps/-/CXuxf6Yz', label: 'ул. Костина, 13, корп. 1'},
	{ href: 'https://yandex.ru/maps/-/CXuxfNP~', label: 'Большая Покровская ул., 82, этаж 5'}
]

const FOOTER_LINKS = [
  { href: '#menu', label: 'Меню' },
  { href: '#delivery', label: 'Доставка' },
  { href: '#delivery', label: 'Оплата' },
  { href: '#story', label: 'История' },
  { href: '#top', label: 'Политика конфиденциальности' },
]

export default function Footer() {
	return (
		<footer className="bg-white">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-title">ШАУРМА на Средном</span>
            <span className="footer-address text-subtle">Нижний Новгород
							<div>{RESTAURANT_ADDRESSES.map(l => (<div><a key={l.label} href={l.href} className='arrow-link' target='_blank'>{l.label}</a></div>))}</div>
						</span>
						<span className="footer-address"><a key={'policy'} href={policy} className='arrow-link text-accent' target='_blank'>Политика конфиденциальности</a></span>
          </div>
          <nav aria-label="Дополнительно" className="footer-nav">
            {FOOTER_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="arrow-link">{l.label}</a>
            ))}
          </nav>
          <div className="footer-socials">
            <a href="#top" aria-label="Telegram" className="soc bg-paper text-ink">
              <FaTelegramPlane size={24} />
            </a>
            <a href="#top" aria-label="ВКонтакте" className="soc soc--text bg-paper text-ink"><FaVk size={24} /></a>
          </div>
        </div>
      </footer>
	);
};