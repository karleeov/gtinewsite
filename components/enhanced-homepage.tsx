'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Shield, Cloud, Monitor, Clock, Layout, Smartphone, ChevronLeft, ArrowRight, Check, Network, RotateCcw, ArrowUpRight } from 'lucide-react'
import dynamic from 'next/dynamic';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInView } from 'react-intersection-observer'

// Move ParticleBackground to a separate component
const ParticleBackground = dynamic(() => Promise.resolve(ParticleBackgroundComponent), {
  ssr: false
});

// Rename the original component
const ParticleBackgroundComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Also need to type the particles array
    interface Particle {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
    }

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Rest of the animation code remains the same
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ... rest of the animation code
    };

    setCanvasSize();
    animate();

    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const circleControls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const news = [
    {
      type: 'News',
      title: 'GTI Office Relocation Notice',
      description: 'We would like to inform you of our new office address.',
      link: '#'
    },
    {
      type: 'Event',
      title: 'Empowering Cybersecurity Innovations!',
      description: 'GTI partners with SenseTime to revolutionize cybersecurity.',
      link: '#'
    },
    {
      type: 'Event',
      title: 'Seminar & Fireside Chat',
      description: 'Safeguard Critical Infrastructure & Important Systems',
      link: '#'
    }
  ]

  const services = [
    {
      icon: Network,
      title: 'GTI',
      href: '/services/infrastructure'
    },
    {
      icon: Shield,
      title: 'Security',
      href: '/services/security'
    },
    {
      icon: Cloud,
      title: 'Secure Hybrid Cloud',
      href: '/services/cloud'
    },
    {
      icon: RotateCcw,
      title: 'Storage & Recovery (DR)',
      href: '/services/storage'
    },
    {
      icon: Layout,
      title: 'Software Applications',
      href: '/services/applications'
    },
    {
      icon: Smartphone,
      title: 'Mobility',
      href: '/services/mobility'
    }
  ]

  const handleDragStart = () => setIsDragging(true)
  const handleDragEnd = () => setIsDragging(false)

  useEffect(() => {
    if (inView) {
      circleControls.start({ opacity: 1, scale: 1 })
    }
  }, [inView, circleControls])

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://scontent.fhkg4-1.fna.fbcdn.net/v/t39.30808-6/360093868_696581255814041_6602748615660366823_n.png?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xo0YZE0O9t4Q7kNvgEX4aJA&_nc_zt=23&_nc_ht=scontent.fhkg4-1.fna&_nc_gid=AnJAsfjvWMs0K4JYPYCCi2D&oh=00_AYBOeKT4Lt2CzhHP9wuYlcorY6nc5noS8sjcKtLhye2H7w&oe=6730C69A"
              alt="GTI Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
          {/* <nav className="hidden md:flex space-x-4">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {service.title}
              </Link>
            ))}
          </nav> */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white hover:text-blue-900"
              onClick={() => window.location.href = '/gtinewhome'}
            >
              Design 2
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
            <Button className="bg-white text-blue-900 hover:bg-blue-100">
              Contact Us
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Particle Effect Background */}
      <section className="relative h-[100vh] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-950">
        <ParticleBackground />
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="relative w-full max-w-6xl mx-auto px-4 flex items-center justify-between">
            <div className="space-y-6 text-white max-w-xl">
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold"
              >
                Revitalize with Innovations
              </motion.h1>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-blue-100"
              >
                Drive new profits and operational efficiency with IT transformation
              </motion.p>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 group">
                  Learn More 
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
            <motion.div
              ref={ref}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              animate={circleControls}
              initial={{ opacity: 0, scale: 0.8 }}
              className="hidden lg:block relative w-96 h-96 cursor-grab active:cursor-grabbing"
            >
              <motion.div 
                className="absolute inset-0 bg-blue-500 rounded-full opacity-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.div 
                className="absolute inset-4 bg-blue-400 rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
              />
              <motion.div 
                className="absolute inset-8 bg-white/90 rounded-full shadow-2xl"
                animate={{ rotate: isDragging ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], ['0%', '50%']),
          }}
          className="absolute inset-0 z-20"
        >
          <svg className="absolute bottom-0 left-0 right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </motion.div>
      </section>

      {/* Service Icons Section */}
      <div className="w-full px-4 py-16 bg-white relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link 
                  href={service.href}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center relative overflow-hidden">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                        <service.icon className="w-10 h-10 text-blue-500 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-200 transition-colors"
                      initial={false}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: 1989, label: "Established", prefix: "" },
            { value: 500, label: "Clients Served", prefix: "+" },
            { value: 6, label: "Major Cities", prefix: "" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: index * 0.5 }}
                className="text-4xl font-bold text-blue-600"
              >
                <CounterAnimation from={0} to={stat.value} duration={2} />
                {stat.prefix}
              </motion.div>
              <p className="text-lg text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Services Tabs */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <Tabs defaultValue="infrastructure" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {services.map((service) => (
                <TabsTrigger key={service.title} value={service.title.toLowerCase().replace(/\s+/g, '-')}>
                  <service.icon className="h-5 w-5 mr-2" />
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {services.map((service) => (
              <TabsContent key={service.title} value={service.title.toLowerCase().replace(/\s+/g, '-')}>
                <Card>
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Detailed information about {service.title} services goes here.</p>
                    <ul className="mt-4 space-y-2">
                      {[1, 2, 3].map((item) => (
                        <li key={item} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>Feature {item} of {service.title}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 group">
                      Learn More
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* News Section with Carousel */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 px-4 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">What's New</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentSlide(Math.min(news.length - 1, currentSlide + 1))}
                disabled={currentSlide === news.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <motion.div 
            className="overflow-hidden"
            initial={false}
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex">
              {news.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="w-full flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="text-sm text-blue-500 font-medium mb-2">{item.type}</div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <Link
                        href={item.link}
                        className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center group"
                      >
                        Learn more 
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8">Let's discuss how GTI can help you achieve your technology goals.</p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-800 hover:bg-blue-100 group">
            Contact Us Today
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">About GTI</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Company Profile</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Our Team</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 4).map((service) => (
                <li key={service.title}>
                  <Link href={service.href} className="text-gray-600 hover:text-blue-600 transition-colors">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Whitepapers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">123 Tech Street</li>
              <li className="text-gray-600">Hong Kong</li>
              <li className="text-gray-600">+852 1234 5678</li>
              <li className="text-gray-600">info@gti.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>&copy; 2023 Global Technology Integrator. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  )
}

// Counter Animation Component
interface CounterAnimationProps {
  from: number;
  to: number;
  duration: number;
}

const CounterAnimation = ({ from, to, duration }: CounterAnimationProps) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(from + (to - from) * progress));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <>{count}</>;
};