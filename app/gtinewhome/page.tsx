'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Component() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentOfficeImage, setCurrentOfficeImage] = useState(0)

  const services = [
    {
      icon: "/placeholder.svg?height=48&width=48",
      title: "Modernized Infrastructure",
      description: "Advanced IT infrastructure solutions"
    },
    {
      icon: "/placeholder.svg?height=48&width=48",
      title: "Security",
      description: "Comprehensive security services"
    },
    {
      icon: "/placeholder.svg?height=48&width=48",
      title: "Secure Hybrid Cloud",
      description: "Flexible cloud solutions"
    },
    {
      icon: "/placeholder.svg?height=48&width=48",
      title: "Storage & DR",
      description: "Reliable backup and disaster recovery"
    },
    {
      icon: "/placeholder.svg?height=48&width=48",
      title: "Software Applications",
      description: "Custom software development"
    },
    {
      icon: "/placeholder.svg?height=48&width=48",
      title: "Mobility",
      description: "Mobile-first solutions"
    }
  ]

  const testimonials = [
    {
      quote: "Having interactions with GTI team, I can attest to the fact that their deliverables are not only cutting-edge, but also future-proof. Their ability to stay ahead of the curve is truly impressive. I highly recommend their services.",
      author: "David Leung",
      position: "Founding CEO",
      company: "AI Tech Ltd"
    },
    {
      quote: "Outstanding digital transformation partner. Their expertise in AI and machine learning has significantly improved our operations.",
      author: "Sarah Chen",
      position: "CTO",
      company: "Innovation Corp"
    }
  ]

  const clients = [
    "/placeholder.svg?height=40&width=120",
    "/placeholder.svg?height=40&width=120",
    "/placeholder.svg?height=40&width=120",
    "/placeholder.svg?height=40&width=120",
    "/placeholder.svg?height=40&width=120",
    "/placeholder.svg?height=40&width=120"
  ]

  const officeImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-EB3FBvnPxtScQiUuMrRwja1k1HhRLG.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20(1)-rEZg4IRxBUAPPwBa7Bb7wLxLnAoFrd.jpeg"
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Office Relocation Notice */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-11-08%20at%2014.04.55_8dd1655b.jpg-8iL3RchbBQTYPxFkhzsaxffVvv4mOx.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-4"
        >
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-[#ff6600]">GTI</span>
              <br />
              <span className="text-[#ff6600]">The Future of Technology</span>
            </h1>
            <p className="text-xl mb-8">
              We're moving to a new location to better serve you
            </p>
            <div className="flex items-center gap-4">
              <Button 
                className="bg-[#ff6600] hover:bg-[#ff8533] text-white group"
                size="lg"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-sm">Effective on</span>
                <br />
                <span className="font-bold">Nov 4th, 2024</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* New Office Preview Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our New Office Space</h2>
          <div className="relative">
            <motion.div 
              key={currentOfficeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-video relative overflow-hidden rounded-lg"
            >
              <Image
                src={officeImages[currentOfficeImage]}
                alt={`New Office Space ${currentOfficeImage + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
            <div className="flex justify-center mt-8 gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentOfficeImage(prev => (prev > 0 ? prev - 1 : officeImages.length - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentOfficeImage(prev => (prev < officeImages.length - 1 ? prev + 1 : 0))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-center mt-8 text-gray-600">
            Modern workspace designed for collaboration and productivity
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What we provide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={48}
                  height={48}
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Brands we work with</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Image
                  src={client}
                  alt={`Client ${index + 1}`}
                  width={120}
                  height={40}
                  className="grayscale hover:grayscale-0 transition-all"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Trusted by our clients</h2>
          <div className="relative">
            <Card>
              <CardContent className="pt-12">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center px-4 md:px-12"
                >
                  <p className="text-2xl text-gray-600 mb-8">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonials[currentTestimonial].author}</p>
                    <p className="text-gray-600">{testimonials[currentTestimonial].position}</p>
                    <p className="text-gray-600">{testimonials[currentTestimonial].company}</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
            <div className="flex justify-center mt-8 gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentTestimonial(prev => (prev > 0 ? prev - 1 : testimonials.length - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentTestimonial(prev => (prev < testimonials.length - 1 ? prev + 1 : 0))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Visit Our New Location</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h3 className="font-bold mb-2">New Office Address</h3>
                <p className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  One Pacific Centre, 414 Kwun Tong Road, Kwun Tong, Kowloon, Hong Kong
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Office Features</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Modern open-plan workspace</li>
                  <li>Panoramic city views</li>
                  <li>State-of-the-art meeting rooms</li>
                  <li>Collaborative areas</li>
                  <li>Enhanced IT infrastructure</li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0459252340247!2d114.2253833!3d22.3097833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040146c55555555%3A0x55555555555555!2sOne%20Pacific%20Centre!5e0!3m2!1sen!2sus!4v1555555555555!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}