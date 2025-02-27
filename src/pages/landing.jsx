import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/comapanies.json";
import faqs from "../data/faq.json";
function LandingPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  const user = useUser();
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 w-full">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4 gradient text-transparent bg-clip-text">
          Find Your Dream Jobs{" "}
          <span className="flex items-center gap-2 sm:gap-6">
            and get{" "}
            <img src="/logo.png" alt="logo" className="h-14 sm:h-24 lg:h-32" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      {user?.user?.unsafeMetadata?.role == null ? (
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/jobs">
            <Button variant="blue" size="xl">
              Find Job
            </Button>
          </Link>
          <Link to="/post-job">
            <Button variant="destructive" size="xl">
              Post a Job
            </Button>
          </Link>
        </div>
      ) : user?.user?.unsafeMetadata?.role === "candidate" ? (
        <div className="flex justify-center flex-col items-center">
          <Link to="/jobs">
            <Button variant="blue" size="xl">
              Find Job
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/jobs">
            <Button variant="blue" size="xl">
              Find Job
            </Button>
          </Link>
          <Link to="/post-job">
            <Button variant="destructive" size="xl">
              Post a Job
            </Button>
          </Link>
        </div>
      )}
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        className="w-full py-10"
      >
        <CarouselContent className="flex  gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img
                src={path}
                alt={name}
                srcSet=""
                className="h-9 sm:-h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* banner */}
      <img src="/banner.jpeg" alt="banner" srcSet="" className="w-full" />
      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Search and apply for jobs , track appliations and more.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post jobs , manage applications , ad find the best candidates</p>
          </CardContent>
        </Card>
      </div>

      {/* fAQ */}

      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => {
          return (
            <AccordionItem id={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
}

export default LandingPage;
