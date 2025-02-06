import Image from 'next/image';
import Link from 'next/link';

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Works', href: '/works' },
  { name: 'Career', href: '/career' },
];

const helpLinks = [
  { name: 'Customer Support', href: '/support' },
  { name: 'Delivery Details', href: '/delivery' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
];

const faqLinks = [
  { name: 'Account', href: '/account' },
  { name: 'Manage Deliveries', href: '/deliveries' },
  { name: 'Orders', href: '/orders' },
  { name: 'Payments', href: '/payments' },
];

const resourceLinks = [
  { name: 'Free eBooks', href: '/ebooks' },
  { name: 'Development Tutorial', href: '/tutorial' },
  { name: 'How to - Blog', href: '/blog' },
  { name: 'Youtube Playlist', href: '/youtube' },
];

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold">SHOP.CO</h2>
            </Link>
            <p className="text-sm text-gray-600 max-w-[300px]">
              We have clothes that suit your style and which you&apos;re proud to wear. From women to men.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-black">
                <Image src="/twitter.svg" alt="Twitter" width={24} height={24} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black">
                <Image src="/github.svg" alt="Github" width={24} height={24} />
              </Link>
            </div>
          </div>

          {/** Reusable Section for Links */}
          {[companyLinks, helpLinks, faqLinks, resourceLinks].map((links, idx) => (
            <div className="space-y-4" key={idx}>
              <h3 className="font-semibold text-lg">{['COMPANY', 'HELP', 'FAQ', 'RESOURCES'][idx]}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-600 hover:text-black">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex items-center gap-4">
              <Image src="/visa.svg" alt="Visa" width={32} height={20} />
              <Image src="/mastercard.svg" alt="Mastercard" width={32} height={20} />
              <Image src="/paypal.svg" alt="PayPal" width={32} height={20} />
              <Image src="/applepay.svg" alt="Apple Pay" width={32} height={20} />
              <Image src="/googlepay.svg" alt="Google Pay" width={32} height={20} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
