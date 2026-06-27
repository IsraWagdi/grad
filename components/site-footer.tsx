import Link from 'next/link'
import { Logo } from '@/components/logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Developed for Human Chromosome Disease Detection using Artificial
              Intelligence. Combining YOLO-based detection with deep learning
              classification.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol
              title="Platform"
              links={[
                { href: '/', label: 'Home' },
                { href: '/analyze', label: 'Analyze' },
                { href: '/results', label: 'Results' },
              ]}
            />
            <FooterCol
              title="Project"
              links={[
                { href: '/about', label: 'About' },
                { href: '/about', label: 'How it works' },
                { href: '/about', label: 'Models' },
              ]}
            />
            <FooterCol
              title="Resources"
              links={[
                { href: '/analyze', label: 'Documentation' },
                { href: '/about', label: 'Research' },
                { href: '/about', label: 'Disclaimer' },
              ]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ChromoAI. For research use only.</p>
          <p className="text-xs">
            Not a substitute for professional medical diagnosis.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={`${link.label}-${i}`}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
