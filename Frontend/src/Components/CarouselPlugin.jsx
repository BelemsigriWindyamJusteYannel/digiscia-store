"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getProducts } from "../api/product"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const images = getProducts.data.map(item=>item.image);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-2/3 flex justify-center items-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="">
        {images.map((image, index) => (
          <CarouselItem key={index} >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                   <img className="object-cover" src={image} alt="" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
