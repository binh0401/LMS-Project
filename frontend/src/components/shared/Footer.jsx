import React from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Instagram, Twitter, Linkedin, Github, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="w-full px-6 py-12 md:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand + blurb */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 font-semibold">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">L</div>
              <span className="text-lg">Shadcnblocks.com</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A collection of 100+ responsive HTML templates for your startup business or side project.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" aria-label="Instagram" className="hover:text-foreground">
                <Instagram className="size-5" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-foreground">
                <Twitter className="size-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-foreground">
                <Linkedin className="size-5" />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-foreground">
                <Github className="size-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground">Overview</Link></li>
              <li><Link to="#" className="hover:text-foreground">Pricing</Link></li>
              <li><Link to="#" className="hover:text-foreground">Marketplace</Link></li>
              <li><Link to="#" className="hover:text-foreground">Features</Link></li>
              <li><Link to="#" className="hover:text-foreground">Integrations</Link></li>
              <li><Link to="#" className="hover:text-foreground">Marketing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground">About</Link></li>
              <li><Link to="#" className="hover:text-foreground">Team</Link></li>
              <li><Link to="#" className="hover:text-foreground">Blog</Link></li>
              <li><Link to="#" className="hover:text-foreground">Careers</Link></li>
              <li><Link to="#" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide">Newsletter</h4>
            <form className="flex w-full max-w-sm items-center gap-2">
              <Input type="email" placeholder="Email" className="flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-muted-foreground mt-3 text-xs">
              By submitting, you agree to our <a href="#" className="underline underline-offset-4">Privacy Policy</a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>Shadcnblocks.com © All rights reserved.</p>
            <p className="inline-flex items-center gap-1">
              Made with <Heart className="size-4 text-destructive" /> by <a href="#" className="hover:text-foreground">@ausrobdev</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
