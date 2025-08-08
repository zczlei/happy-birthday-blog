import type { Metadata } from 'next'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Happy Birthday Funny Meme Collection - Hilarious Birthday Memes for Everyone',
  description: 'Discover the funniest happy birthday memes for brothers, sisters, him, her and everyone! Our collection of happy birthday funny memes will make any birthday celebration memorable.',
  keywords: 'happy birthday funny meme, happy birthday brother funny, happy birthday sister funny, brother funny happy birthday, happy birthday funny for him, happy birthday funny for her, funny birthday memes, birthday humor',
  openGraph: {
    title: 'Happy Birthday Funny Meme Collection - Hilarious Birthday Memes',
    description: 'The ultimate collection of funny birthday memes for every occasion. Perfect for brothers, sisters, friends and family!',
    type: 'article',
    images: [
      {
        url: '/hero-birthday-memes.png',
        width: 1200,
        height: 630,
        alt: 'Happy Birthday Funny Meme Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Birthday Funny Meme Collection',
    description: 'Hilarious birthday memes for everyone - brothers, sisters, friends and family!',
    images: ['/hero-birthday-memes.png']
  }
}

const memeCategories = [
  {
    title: "Happy Birthday Brother Funny Memes",
    description: "Hilarious memes perfect for your brother's special day",
    keyword: "happy birthday brother funny",
    memes: [
      {
        src: "/brother-cake-meme.png",
        alt: "Happy birthday brother funny meme with cake joke",
        caption: "When your brother asks for a bigger cake slice"
      },
      {
        src: "/brother-age-meme.png",
        alt: "Brother funny happy birthday meme with age joke",
        caption: "Another year older, another year of being the favorite child"
      },
      {
        src: "/brother-money-meme.png",
        alt: "Funny birthday meme for brother with sibling rivalry",
        caption: "Happy birthday to my brother who still owes me $20"
      }
    ]
  },
  {
    title: "Happy Birthday Sister Funny Memes",
    description: "Perfect funny memes to celebrate your sister's birthday",
    keyword: "happy birthday sister funny",
    memes: [
      {
        src: "/sister-shopping-meme.png",
        alt: "Happy birthday sister funny meme with shopping joke",
        caption: "When your sister says she doesn't want anything expensive"
      },
      {
        src: "/sister-younger-meme.png",
        alt: "Sister funny birthday meme with age humor",
        caption: "Happy birthday to my sister who's still younger than me"
      },
      {
        src: "/sister-fabulous-meme.png",
        alt: "Funny birthday meme for sister with makeup joke",
        caption: "Another year of perfecting the art of looking fabulous"
      }
    ]
  },
  {
    title: "Happy Birthday Funny For Him",
    description: "Funny birthday memes perfect for the special men in your life",
    keyword: "happy birthday funny for him",
    memes: [
      {
        src: "/him-experience-meme.png",
        alt: "Happy birthday funny for him meme with sports joke",
        caption: "When he says he's not getting older, just more experienced"
      },
      {
        src: "/him-wine-meme.png",
        alt: "Funny birthday meme for him with dad joke",
        caption: "Happy birthday to someone who's aging like fine wine"
      },
      {
        src: "/him-technology-meme.png",
        alt: "Birthday funny meme for him with hobby reference",
        caption: "Another year of pretending to understand technology"
      }
    ]
  },
  {
    title: "Happy Birthday Funny For Her",
    description: "Hilarious birthday memes to make her day extra special",
    keyword: "happy birthday funny for her",
    memes: [
      {
        src: "/her-fabulous-meme.png",
        alt: "Happy birthday funny for her meme with wine joke",
        caption: "Celebrating another year of being fabulous"
      },
      {
        src: "/her-backwards-meme.png",
        alt: "Funny birthday meme for her with friendship humor",
        caption: "Happy birthday to someone who's aging backwards"
      },
      {
        src: "/her-queen-meme.png",
        alt: "Birthday funny meme for her with self-care joke",
        caption: "Another year of being the queen you were born to be"
      }
    ]
  }
]

export default function HappyBirthdayFunnyMemePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center text-purple-800 mb-2">
            Happy Birthday Funny Meme Collection
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            The ultimate collection of <strong>happy birthday funny memes</strong> for every occasion!
            Find the perfect meme for brothers, sisters, friends, and family members.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Introduction Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Happy Birthday Funny Memes Are Perfect for Every Celebration
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Looking for the perfect way to wish someone a happy birthday? Our collection of
                <strong> happy birthday funny memes</strong> is exactly what you need! Whether you're
                searching for a <strong>happy birthday brother funny</strong> meme or a
                <strong> happy birthday sister funny</strong> option, we've got you covered.
              </p>
              <p className="mb-4">
                Funny birthday memes have become the go-to way to celebrate birthdays in the digital age.
                They combine humor with heartfelt wishes, making them perfect for social media posts,
                text messages, or even printed cards. Our curated selection includes
                <strong> happy birthday funny for him</strong> and <strong>happy birthday funny for her</strong> options
                that will guarantee laughs and smiles.
              </p>
            </div>
          </div>

          {/* Featured Hero Image */}
          <div className="text-center mb-8">
            <Image
              src="/hero-birthday-memes.png"
              alt="Happy birthday funny meme collection hero image"
              width={800}
              height={500}
              className="mx-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </section>

        {/* Meme Categories */}
        {memeCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {category.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {category.description}. These <strong>{category.keyword}</strong> memes
                are guaranteed to bring joy and laughter to any birthday celebration.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.memes.map((meme, memeIndex) => (
                  <Card key={memeIndex} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <Image
                        src={meme.src || "/placeholder.svg"}
                        alt={meme.alt}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <p className="text-sm text-gray-600 font-medium">
                          {meme.caption}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

        ))}

        {/* Tips Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              How to Use Happy Birthday Funny Memes Effectively
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-3">
                  For Social Media
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Share <strong>happy birthday funny memes</strong> on Facebook, Instagram, or Twitter</li>
                  <li>Tag the birthday person for maximum impact</li>
                  <li>Use relevant hashtags like #HappyBirthday #FunnyMemes</li>
                  <li>Perfect for <strong>brother funny happy birthday</strong> posts</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-3">
                  For Personal Messages
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Send via text message or WhatsApp</li>
                  <li>Include with a personalized birthday card</li>
                  <li>Perfect for <strong>happy birthday funny for him</strong> or <strong>her</strong> messages</li>
                  <li>Great conversation starters at birthday parties</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions About Happy Birthday Funny Memes
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  What makes a good happy birthday funny meme?
                </h3>
                <p className="text-gray-700">
                  A great <strong>happy birthday funny meme</strong> combines relatable humor with birthday themes.
                  The best memes are those that the birthday person can connect with, whether it's about aging,
                  cake, presents, or family dynamics.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  Can I use these memes for commercial purposes?
                </h3>
                <p className="text-gray-700">
                  Our <strong>happy birthday brother funny</strong> and <strong>happy birthday sister funny</strong> memes
                  are perfect for personal use. For commercial use, please ensure you have proper licensing for any images used.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  How do I choose between happy birthday funny for him vs her?
                </h3>
                <p className="text-gray-700">
                  Consider the person's interests, sense of humor, and your relationship with them.
                  <strong> Happy birthday funny for him</strong> memes might focus on sports, technology, or dad jokes,
                  while <strong>happy birthday funny for her</strong> might include themes about friendship, self-care, or wine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Make Every Birthday Memorable with Funny Memes
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Whether you need a <strong>happy birthday funny meme</strong> for your brother, sister,
              or anyone special in your life, our collection has something for everyone.
              These <strong>brother funny happy birthday</strong> and sister memes are sure to bring
              smiles and create lasting memories. Bookmark this page and never run out of
              hilarious birthday content again!
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2024 Happy Birthday Funny Meme Collection. All rights reserved.</p>
          <p className="text-gray-400">
            The best source for <strong>happy birthday funny memes</strong>,
            <strong> happy birthday brother funny</strong>, and <strong>happy birthday sister funny</strong> content.
          </p>
        </div>
      </footer>
    </div>
  )
}
