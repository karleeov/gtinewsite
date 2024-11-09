"use client"

import { ArrowRight, ChevronDown, ChevronRight, Menu, Cloud, Shield, Cog, Zap, Award, Users, Building, Database, Server, Globe, LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useAnimation, useSpring, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { TypeAnimation } from 'react-type-animation'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import InteractiveLogo from '@/components/interactive-logo' // Adjust the path as necessary

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  // Remove these lines
  // const [marioPosition, setMarioPosition] = useState(0)
  const [animatedNumbers, setAnimatedNumbers] = useState({
    qualifications: 0,
    awards: 0,
    cloudStats: 0
  })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const sections = [
    { id: "hero", title: "Home" },
    { id: "digital-core", title: "Digital Core Capabilities" },
    { id: "azure-services", title: "Azure Services" },
    { id: "operating-model", title: "Digital Operating Model" },
    { id: "stats", title: "Our Achievements" },
    { id: "infographic", title: "Our Impact" },
    { id: "talent", title: "Empowering Talent" },
    { id: "about", title: "About GTI" },
  ]

  const handleScroll = (index: number) => {
    setCurrentSection(index)
  }

  const projectStats = [
    { number: 500, label: "Projects Completed", icon: Zap },
    { number: 100, label: "Enterprise Clients", icon: Building },
    { number: 50, label: "Cloud Migrations", icon: Cloud },
    { number: 1000, label: "Users Supported", icon: Users },
  ]

  const azureServices = [
    { title: "Azure Data Solutions", description: "Implement and manage Azure SQL, Cosmos DB, and Data Factory for robust data solutions.", icon: Database },
    { title: "Azure Infrastructure", description: "Design and deploy scalable Azure infrastructure using VMs, AKS, and Azure App Service.", icon: Server },
    { title: "Azure Security", description: "Implement Azure AD, Key Vault, and Security Center for comprehensive cloud security.", icon: Shield },
  ]

  useEffect(() => {
    const animationDuration = 2000 // 2 seconds
    const steps = 50

    const animateNumber = (start: number, end: number, setter: (value: number) => void) => {
      let current = start
      const increment = (end - start) / steps
      const stepDuration = animationDuration / steps

      const timer = setInterval(() => {
        current += increment
        if (current >= end) {
          clearInterval(timer)
          current = end
        }
        setter(Math.round(current))
      }, stepDuration)
    }

    animateNumber(0, 1000, (value) => setAnimatedNumbers(prev => ({ ...prev, qualifications: value })))
    animateNumber(0, 50, (value) => setAnimatedNumbers(prev => ({ ...prev, awards: value })))
    animateNumber(0, 450000, (value) => setAnimatedNumbers(prev => ({ ...prev, cloudStats: value })))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % azureServices.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Remove this useEffect
  // useEffect(() => {
  //   const gameLoop = setInterval(() => {
  //     setMarioPosition((prev) => (prev + 5) % 100)
  //   }, 50)

  //   return () => clearInterval(gameLoop)
  // }, [])

  const FadeInSection = ({ children }: { children: React.ReactNode }) => {
    const controls = useAnimation()
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    })

    useEffect(() => {
      if (inView) {
        controls.start("visible")
      }
    }, [controls, inView])

    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          hidden: { opacity: 0, y: 50 }
        }}
      >
        {children}
      </motion.div>
    )
  }

  const FloatingIcon = ({ icon: Icon, delay = 0 }: { icon: LucideIcon, delay?: number }) => (
    <motion.div
      className="absolute left-0 top-0"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        delay,
      }}
    >
      <Icon className="h-12 w-12 text-primary" />
    </motion.div>
  )

  const AnimatedNumber = ({ value, duration = 2 }: { value: number; duration?: number }) => {
    const springValue = useSpring(value, { stiffness: 100, damping: 10 })
    
    useEffect(() => {
      springValue.set(value)
    }, [springValue, value])
    
    return (
      <motion.span>
        {springValue.get().toFixed(0)}
      </motion.span>
    )
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="#" className="flex items-center gap-2">
            <Image 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4MBQk8U3t_2HxgqhL_e5ZsyrMBfPytA1IQ&s"
              alt="GTI Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="font-bold">Global Technology Integrator Limited (GTI)</span>
          </Link>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {sections.map((section, index) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="block px-2 py-1 hover:text-primary"
                    onClick={() => handleScroll(index)}
                  >
                    {section.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex items-center gap-6">
            {sections.map((section, index) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="text-sm font-medium hover:text-primary"
                onClick={() => handleScroll(index)}
              >
                {section.title}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center overflow-hidden snap-start"
          style={{ backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-11-08%20at%2014.04.55_8dd1655b.jpg-8iL3RchbBQTYPxFkhzsaxffVvv4mOx.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <motion.div
            className="absolute inset-0 z-0"
            style={{ opacity, scale }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snippet-Nj2uU1QgDiAeKfB3lK4mYnu5PloAdv.txt"
              alt="Global Technology Integrator Limited (GTI) hero image"
              className="object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 animate-gradient-x"></div>
          <motion.div
            className="container relative z-10 text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-6 md:text-6xl">
              <TypeAnimation
                sequence={[
                  'A heritage of GTI',
                  1000,
                  'Innovating with Azure',
                  1000,
                  'Empowering businesses',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto italic">
              "Staying at the forefront of technologies to empower our customers with Azure solutions."
            </p>
            <Button size="lg" className="rounded-full">
              Explore Azure Solutions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </motion.div>
        </section>
        {/* <section className="py-16">
          <InteractiveLogo />
        </section> */}
        <section id="digital-core" className="bg-[#E65100] text-white min-h-screen flex items-center justify-center snap-start relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-red-600 animate-gradient-xy"></div>
          </div>
          <FadeInSection>
            <div className="container py-20 relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center">Digital Core Capabilities</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <FloatingIcon icon={Cloud} delay={0} />
                  <h3 className="text-xl font-semibold mb-4 pl-16">Professional Services</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      Managed Services
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      Implementation
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      Consultation
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      Billing Management
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      Build & Train
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <FloatingIcon icon={Shield} delay={0.5} />
                  <h3 className="text-xl font-semibold mb-4 pl-16">Technical Expertise</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      Azure Virtual Desktop (58%)
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      Azure Infrastructure (46%)
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      Azure Security (33%)
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      MSP / Onsite Support (29%)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>
        <section id="azure-services" className="bg-[#0078D4] text-white min-h-screen flex items-center justify-center snap-start relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-600 animate-gradient-xy"></div>
          </div>
          <FadeInSection>
            <div className="container py-20 relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Azure Services</h2>
              <div className="relative h-[400px] overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentSlide}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-white/10 backdrop-blur border-none text-white relative overflow-hidden w-full max-w-lg">
                      <CardContent className="p-6">
                        <FloatingIcon icon={azureServices[currentSlide].icon} delay={0.2} />
                        <h3 className="text-xl font-semibold mb-4 pl-16">{azureServices[currentSlide].title}</h3>
                        <p>{azureServices[currentSlide].description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex justify-center mt-8">
                {azureServices.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>
        <section id="operating-model" className="bg-[#0288D1] text-white min-h-screen flex items-center justify-center snap-start relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-600 animate-gradient-xy"></div>
          </div>
          <FadeInSection>
            <div className="container py-20 relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center">Digital Operating Model</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-white/10 backdrop-blur border-none text-white relative overflow-hidden">
                  <CardContent className="p-6">
                    <FloatingIcon icon={Cog} delay={0.2} />
                    <h3 className="text-xl font-semibold mb-4 pl-16">Integration Services</h3>
                    <p>API Products recommendation, Legacy & New system integration, Implementation services</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur border-none text-white relative overflow-hidden">
                  <CardContent className="p-6">
                    <FloatingIcon icon={Shield} delay={0.4} />
                    <h3 className="text-xl font-semibold mb-4 pl-16">Security & Monitoring</h3>
                    <p>24x7 SoC center, Detect & Protect & Response, Application Performance Monitoring</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur border-none text-white relative overflow-hidden">
                  <CardContent className="p-6">
                    <FloatingIcon icon={Cloud} delay={0.6} />
                    <h3 className="text-xl font-semibold mb-4 pl-16">Azure Native & Hybrid</h3>
                    <p>Foundation, Azure Infrastructure, AKS, VMware Solutions, and Terraform implementation</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </FadeInSection>
        </section>
        <section id="stats" className="py-16 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-bl from-green-400 to-blue-500 animate-gradient-xy"></div>
          </div>
          <FadeInSection>
            <div className="container relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FloatingIcon icon={Award} delay={0.2} />
                  <div className="text-4xl font-bold text-[#4338CA] mb-2 pl-16">
                    <AnimatedNumber value={250} />+
                  </div>
                  <div className="text-gray-600">Professional Qualifications</div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <FloatingIcon icon={Award} delay={0.4} />
                  <div className="text-4xl font-bold text-[#4338CA] mb-2 pl-16">
                    <AnimatedNumber value={50} />+
                  </div>
                  <div className="text-gray-600">Partner Awards</div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <FloatingIcon icon={Cloud} delay={0.6} />
                  <div className="text-4xl font-bold text-[#4338CA] mb-2 pl-16">
                    <AnimatedNumber value={450000} duration={3} />+
                  </div>
                  <div className="text-gray-600">Azure Resources Managed</div>
                </motion.div>
              </div>
            </div>
          </FadeInSection>
        </section>
        <section id="infographic" className="bg-[#4A148C] text-white min-h-screen flex items-center justify-center snap-start relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-600 to-pink-600 animate-gradient-xy"></div>
          </div>
          <FadeInSection>
            <div className="container py-20 relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Azure Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {projectStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center relative"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <FloatingIcon icon={stat.icon} delay={index * 0.2} />
                    <div className="text-4xl font-bold mb-2 pl-16">
                      <AnimatedNumber value={stat.number} />+
                    </div>
                    <div className="text-lg">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-8 text-center">Our Azure Journey</h3>
                <div className="relative h-[400px]">
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="Azure Journey Infographic"
                    className="object-contain"
                    fill
                  />
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>
        <section id="talent" className="bg-[#7B1FA2] text-white min-h-screen flex items-center justify-center snap-start relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 animate-gradient-xy"></div>
          </div>
          <FadeInSection>
            <div className="container py-20 relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center">Empowering Talent with Azure</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <FloatingIcon icon={Users} delay={0.2} />
                  <h3 className="text-xl font-semibold mb-6 pl-16">Our Azure Expertise</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      Microsoft Gold Partner
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      Azure Expert MSP
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5" />
                      200+ Azure Certified Professionals
                    </li>
                  </ul>
                </div>
                <div className="relative h-[300px]">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Azure Certified Team"
                    className="object-cover rounded-lg"
                    fill
                  />
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>
        <section id="about" className="min-h-screen flex items-center justify-center snap-start relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-pink-500 animate-gradient-xy"></div>
          </div>
          <FadeInSection>
            <div className="container py-20 text-center relative z-10">
              <h2 className="text-3xl font-bold mb-12">About Global Technology Integrator Limited (GTI)</h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg mb-8">
                  Established since 1989, Global Technology Integrator Limited (GTI) has been at the forefront of technologies to provide Best-of-Breed IT solutions
                  and quality services to our customers. As a Microsoft Gold Partner and Azure Expert MSP, we specialize in delivering cutting-edge Azure solutions.
                  Headquartered in Hong Kong with offices across major cities in China, we're your trusted partner for Azure innovation.
                </p>
                <Button size="lg" className="rounded-full">
                  Discover Our Azure Expertise
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </FadeInSection>
        </section>
        {/* Remove this entire section */}
        {/* <section id="mario-game" className="min-h-screen flex items-center justify-center snap-start relative overflow-hidden bg-[#5C94FC]">
          {/* ... */}
        {/* </section> */}
      </main>
      <footer className="bg-background border-t py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-bl from-gray-200 to-gray-400 animate-gradient-xy"></div>
        </div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Azure Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Azure Migration
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Azure DevOps
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Azure Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; 2024 Global Technology Integrator Limited (GTI). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}