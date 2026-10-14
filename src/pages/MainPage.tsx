import { useEffect, useRef, useState } from 'react'
import MENU, { CATEGORIES, HITS, SIZES } from '../data/menu'
import { useSiteEffects } from '../hooks/useSiteEffects'
import '../styles/builder/builder.css'
import '../styles/delivery/delivery.css'
import '../styles/extras/extras.css'
import '../styles/footer/footer.css'
import '../styles/header/header.css'
import '../styles/hero/hero.css'
import '../styles/marquee/marquee.css'
import '../styles/menu/menu.css'
import '../styles/root/root.css'
import '../styles/story/story.css'
import './MainPage.css'

import Footer from '../components/layout/Footer'
import { type SizeId } from '../types/menu'
import { svgProps } from '../types/svg'

import { FaFire } from 'react-icons/fa'

const MARQUEE = [
  'Самовывоз круглосуточно',
  'Доставка 08:00–23:00',
  'Пицца · хачапури · ламаджо · цезарь — 24/7',
  'Шаурма от 300 ₽',
];

const NAV = [
  { href: '#menu', label: 'Меню' },
  { href: '#build', label: 'Собрать шаурму' },
  { href: '#delivery', label: 'Доставка и оплата' },
  { href: '#story', label: 'О нас' },
];

const STATS = [
  { value: 'от 300 ₽', label: 'мини-шаурма' },
  { value: '3 размера', label: 'мини, стандарт, VIP' },
  { value: '24/7', label: 'пицца и хачапури' },
];

const TILES = [
  { note: 'НОВИНКА', bg: 'bg-shashlik', name: 'Шашлык', cta: 'Смотреть →' },
  { note: '', bg: 'bg-kebab', name: 'Люля-кебаб', cta: 'Смотреть →' },
  { note: '', bg: 'bg-khachapuri', name: 'Хачапури', cta: 'Смотреть →' },
  { note: '', bg: 'bg-burger', name: 'Пицца и бургеры', cta: 'Смотреть →' },
];

export default function MainPage() {
  const [meatId, setMeatId] = useState('chicken')
  const [sizeId, setSizeId] = useState<SizeId>('std')
  const [cheese, setCheese] = useState(false)
  const [fries, setFries] = useState(false)
  const [count, setCount] = useState(0)
  const [sum, setSum] = useState(0)
  const [flash, setFlash] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const rootRef = useRef<HTMLDivElement>(null)
  useSiteEffects(rootRef)

  const meat = MENU.find((m) => m.id === meatId) ?? MENU[0]
  const size: SizeId = meat.sizes[sizeId] != null ? sizeId : 'std'
  const hasCheese = meat.addons && cheese
  const hasFries = meat.addons && fries
  const price = (meat.sizes[size] ?? 0) + (hasCheese ? 40 : 0) + (hasFries ? 50 : 0)
  const extras = [hasCheese ? 'сыром' : null, hasFries ? 'фри' : null].filter(Boolean)
  const sizeAdj = SIZES.find((s) => s.id === size)!.adj
  const configName = `${sizeAdj} ${meat.gen}${extras.length ? ', с ' + extras.join(' и ') : ''}`

  const addToCart = (p: number) => {
    setCount((c) => c + 1)
    setSum((s) => s + p)
    setFlash(false)
    window.setTimeout(() => setFlash(true), 0)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setFlash(false), 1400)
  }

  const addons = [
    { label: 'Сыр', note: '+40 ₽', on: hasCheese, toggle: () => setCheese(!cheese) },
    { label: 'Картофель фри', note: '+50 ₽', on: hasFries, toggle: () => setFries(!fries) },
  ]

  return (
    <div ref={rootRef} className="app text-ink bg-paper">

      {/* {HERO} */}
      <section className="hero bg-ink text-white">
        <div className="hero-bg bg-background-coal" aria-hidden="true"></div>
        <div className="hero-scrim" aria-hidden="true"></div>
        <div className="embers" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="ember"></span>
          ))}
        </div>

        <header className="site-header">
          <a href="#top" className="logo text-white">
            <span className="logo-mark bg-logo" role="img" aria-label="Шаурма" />
            <span className="logo-text">
              <span className="logo-title">ШАУРМА</span>
              <span className="logo-sub text-muted">на Средном · Н. Новгород</span>
            </span>
          </a>
          <nav aria-label="Основное меню" className="site-nav">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="nav-link text-white">{n.label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <a href="tel:+79023003030" className="nav-link header-phone text-white">+7 902 300-30-30</a>
            <button type="button" aria-label="Корзина" className={`cart-btn btn btn-light bg-white text-ink${flash ? ' bump' : ''}`}>
              <svg width="20" height="20" {...svgProps} stroke="currentColor" strokeWidth="2">
                <path d="M6 7h12l-1 13H7L6 7z"></path>
                <path d="M9 7a3 3 0 0 1 6 0"></path>
              </svg>
              {count > 0 ? `${count} · ${sum} ₽` : 'Корзина'}
            </button>
          </div>
        </header>

        <div id="top" className="hero-content">
          <div className="hero-text">
            <div className="rise d1 hero-badges">
              <span className="hero-badge hero-badge--live bg-chip-dark text-sun"><span className="live-dot"></span>Самовывоз 24/7</span>
              <span className="hero-badge bg-chip-dark text-white">Доставка 08:00–23:00</span>
            </div>
            <h1 className="rise d2 hero-title">Горячая шаурма <span className="text-accent">днём и&nbsp;ночью</span></h1>
            <p className="rise d3 hero-lead text-soft">Мраморная говядина, курица, свинина и «Чикен Карри». Доставляем по Нижнему Новгороду, а забрать заказ можно в любое время суток.</p>
            <div className="rise d4 hero-actions">
              <a href="#build" className="btn btn-primary hero-btn hero-btn--primary bg-accent text-ink">Собрать свою шаурму
                <svg width="18" height="18" {...svgProps} stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
              </a>
              <a href="#menu" className="btn btn-ghost hero-btn hero-btn--ghost border-ghost text-white">Всё меню</a>
            </div>
            <div className="rise d5 hero-stats">
              {STATS.map((s) => (
                <div key={s.value} className="hero-stat">
                  <span className="hero-stat-value">{s.value}</span>
                  <span className="hero-stat-label text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rise d6 hero-visual">
            <div className="float" data-cursor="view">
              <div className="bg-main hero-photo"></div>
            </div>
            <div className="wobble hero-sticker bg-accent text-ink">
              <span className="hero-sticker-label">Стандартная</span>
              <span className="hero-sticker-name">с говядиной</span>
              <span className="hero-sticker-price">450 ₽</span>
            </div>
          </div>
        </div>
      </section>

      {/* RUNNING STRIP */}
      <div className="marquee bg-accent text-ink">
        <div className="marquee-track">
          {[0, 1].flatMap((copy) =>
            MARQUEE.flatMap((t) => [
              <span key={`${copy}-${t}`} aria-hidden={copy === 1 || undefined}>{t}</span>,
              <span key={`${copy}-${t}-s`} aria-hidden="true">✦</span>,
            ]),
          )}
        </div>
      </div>

      {/* MENU */}
      <section id="menu" className="menu">
        <div className="reveal menu-head">
          <h2 className="section-title">Меню</h2>
        </div>
        <div className="reveal chips">
          {CATEGORIES.map((c, i) => (
            <a key={c} href="#menu" className={`chip ${i === 0 ? 'chip--active bg-ink text-white' : 'bg-white text-ink'}`}>{c}</a>
          ))}
        </div>

        <div className="reveal menu-grid">
          {HITS.map((item) => (
            <article key={item.name} className="card menu-card bg-white">
              <div className="media" data-cursor="view">
                <div className={"media-in light menu-card-photo " + item.photo}>{item.note ? <span className="extras-tile-note text-accent">{item.note} <FaFire width={24} height={24} /></span> : <span></span>}</div>
              </div>
              <div className="menu-card-body">
                <h3 className="menu-card-title">{item.name}</h3>
                <p className="menu-card-desc text-subtle">{item.desc}</p>
              </div>
              <div className="menu-card-footer">
                <span className="menu-card-price">{item.price} ₽</span>
                <button type="button" className="add-btn bg-ink text-white" onClick={() => addToCart(item.price)} aria-label={`Добавить в корзину: ${item.name}`}>
                  <svg width="22" height="22" {...svgProps} stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"></path></svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="menu-more"><a href="#menu" className="btn btn-primary bg-accent text-ink menu-more-btn menu-more-btn--primary">Открыть полное меню<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a></div>
      </section>

      {/* BUILDER */}
      <section id="build" className="builder">
        <div className="reveal builder-panel bg-white">
          <div className="builder-intro">
            <span className="eyebrow text-rust">Конструктор</span>
            <h2 className="section-title builder-title">Собери шаурму под себя</h2>
            <p className="builder-lead text-subtle">Вместо списка из 30 позиций — три шага. Цена пересчитывается сразу.</p>
            <div className="zoom builder-preview">
              <div className="bg-chicken-beef light builder-preview-photo"></div>
            </div>
          </div>

          <div className="builder-form">
            <fieldset className="builder-group">
              <legend className="builder-legend">1. Начинка</legend>
              <div className="builder-options">
                {MENU.map((m) => (
                  <button key={m.id} type="button" className={`opt${m.id === meat.id ? ' on' : ''}`} aria-pressed={m.id === meat.id} onClick={() => setMeatId(m.id)}>{m.label}</button>
                ))}
              </div>
            </fieldset>

            <fieldset className="builder-group">
              <legend className="builder-legend">2. Размер</legend>
              <div className="builder-options">
                {SIZES.map((s) => {
                  const p = meat.sizes[s.id]
                  return (
                    <button key={s.id} type="button" className={`opt${s.id === size ? ' on' : ''}`} aria-pressed={s.id === size} disabled={p == null} onClick={() => setSizeId(s.id)}>
                      {s.label} <small>{p != null ? `${p} ₽` : 'нет'}</small>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <fieldset className="builder-group">
              <legend className="builder-legend">3. Добавки</legend>
              <div className="builder-options">
                {addons.map((a) => (
                  <button key={a.label} type="button" className={`opt${a.on ? ' on' : ''}`} aria-pressed={a.on} disabled={!meat.addons} onClick={a.toggle}>
                    {a.label} <small>{a.note}</small>
                  </button>
                ))}
              </div>
              {!meat.addons && <p className="builder-note text-subtle">Для «Чикен Карри» добавки не предусмотрены.</p>}
            </fieldset>

            <div className="builder-total border-line">
              <div className="builder-total-info">
                <span className="builder-config text-subtle">{configName}</span>
                <span className="builder-price">{price} ₽</span>
              </div>
              <button type="button" className={`btn builder-add bg-accent text-ink${flash ? ' done' : ''}`} onClick={() => addToCart(price)}>
                {flash ? 'Добавлено ✓' : 'Добавить в корзину'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MORE FROM THE GRILL */}
      <section className="extras">
        <h2 className="reveal section-title">Не только шаурма</h2>
        <div className="reveal extras-grid">
          {TILES.map((t) => (
            <a key={t.name} href="#menu" className="tile extras-tile" data-cursor="view">
              <span className={`tile-bg ${t.bg}`} aria-hidden="true"></span>
              {t.note ? <span className="extras-tile-note text-muted">{t.note}</span> : <span></span>}
              <span className="tile-title">
                <span className="extras-tile-name text-white">{t.name}</span>
                <span className="tile-cta extras-tile-cta text-sun">{t.cta}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="bg-ink text-white">
        <div className="delivery-inner">
          <h2 className="reveal section-title">Как получить заказ</h2>
          <div className="reveal delivery-grid">
            <div className="dcard bg-card-dark">
              <svg width="32" height="32" {...svgProps} stroke="currentColor" strokeWidth="1.8" className="text-sun">
                <path d="M3 7h11v9H3z"></path><path d="M14 10h4l3 3v3h-7"></path><circle cx="7" cy="18" r="1.8"></circle><circle cx="17" cy="18" r="1.8"></circle>
              </svg>
              <h3 className="dcard-title">Доставка</h3>
              <p className="dcard-value">08:00–23:00</p>
              <p className="dcard-text text-muted">По Нижнему Новгороду. Стоимость доставки оператор назовёт при подтверждении заказа.</p>
            </div>
            <div className="dcard bg-card-dark">
              <svg width="32" height="32" {...svgProps} stroke="currentColor" strokeWidth="1.8" className="text-sun">
                <path d="M6 8h12l-1 12H7L6 8z"></path><path d="M9 8a3 3 0 0 1 6 0"></path>
              </svg>
              <h3 className="dcard-title">Самовывоз</h3>
              <p className="dcard-value">Круглосуточно</p>
              <p className="dcard-text text-muted">[АДРЕС ТОЧКИ] — закажите заранее и заберите без очереди.</p>
            </div>
            <div className="dcard bg-card-dark">
              <svg width="32" height="32" {...svgProps} stroke="currentColor" strokeWidth="1.8" className="text-sun">
                <circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>
              </svg>
              <h3 className="dcard-title">Ночью тоже</h3>
              <p className="dcard-value">24/7</p>
              <p className="dcard-text text-muted">Пицца, хачапури, ламаджо и цезарь — ежедневно и круглосуточно.</p>
            </div>
          </div>
          <div className="reveal delivery-phones">
            <span className="delivery-phones-label text-muted">Заказ по телефону:</span>
            <a href="tel:+79023003030" className="btn btn-primary phone-btn phone-btn--primary bg-accent text-ink">+7 902 300-30-30</a>
            <a href="tel:+78312300000" className="btn btn-ghost phone-btn phone-btn--ghost border-dark text-white">+7 831 230-00-00</a>
            <a href="tel:+78314244243" className="btn btn-ghost phone-btn phone-btn--ghost border-dark text-white">+7 831 424-42-43</a>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="reveal story">
        <div className="zoom story-photo" data-cursor="view">
          <div className="bg-history light story-photo-inner"></div>
        </div>
        <div className="story-body">
          <span className="eyebrow text-rust">История</span>
          <h2 className="story-title">Шаурма на Средном</h2>
          <p className="story-text text-subtle">[2–3 предложения: с какого года работаете, с чего всё началось и почему именно на Средном. Взять из раздела «История нашей шаурмы».]</p>
          <a href="#story" className="arrow-link story-link">Читать историю <span>→</span></a>
        </div>
      </section>

      <Footer />
    </div>
  )
};