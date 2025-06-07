import { useEffect, useId, useState } from "react"
import { RiStarFill } from "@remixicon/react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
//import { postComment } from "../api/Comment"
import { getProductRate } from "../api/product"
import { Button } from "./ui/button"
import { setProductRate } from "../api/product"

export default function Rating({profile,product,comment}) {
  const id = useId()
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState()

  useEffect(()=>{
    getProductRate(product.id)
    .then(data=>{
        setCurrentRating(data)
    })
  },[])

  return (
    <fieldset className="space-y-4 flex flex-col items-start m-5">
      <legend className="text-foreground text-sm leading-none font-medium">
        Note
      </legend>
      <RadioGroup className="inline-flex gap-0" onValueChange={setCurrentRating}>
        {["1", "2", "3", "4", "5"].map((value) => (
          <label
            key={value} 
            className="group has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative cursor-pointer rounded p-0.5 outline-none has-focus-visible:ring-[3px]"
            onMouseEnter={() => setHoverRating(value)}
            >
            <RadioGroupItem id={`${id}-${value}`} value={value} className="sr-only" />
            <RiStarFill
              size={24}
              className={`transition-all ${
                (hoverRating || currentRating) >= value
                  ? "text-amber-500"
                  : "text-input"
              } group-hover:scale-110`} />
            <span className="sr-only">
              {value} star{value === "1" ? "" : "s"}
            </span>
          </label>
        ))}
      </RadioGroup>
      {
        hoverRating ? (
          <Button 
            className="bg-orange-400"
            onClick={()=>{
              setProductRate(comment.id,currentRating)
              .then(data=>{
                console.log("response =>", data)
              })
              .catch(error=>{
                console.log("error =>",error)
              })
            }}
            >
            Valider
          </Button>
        ) : (
          <></>
        )
      }
    </fieldset>
  );
}
