"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
  startIndex = 0,
  delay = 0,
  onImageChange,
}: {
  images: string[];
  children?: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
  startIndex?: number;
  delay?: number;
  onImageChange?: (currentImage: string) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  // Function to generate a random image index that's different from the current one
  const getRandomIndex = () => {
    if (images.length <= 1) return 0;

    const randomIndex = Math.floor(Math.random() * (images.length - 1));
    // Adjust index to avoid current image
    return randomIndex >= currentIndex ? randomIndex + 1 : randomIndex;
  };

  // Modified to use random selection instead of sequential
  const handleNext = () => {
    setCurrentIndex(getRandomIndex());
  };

  const handlePrevious = () => {
    setCurrentIndex(getRandomIndex());
  };

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[]);
      })
      .catch((error) => console.error("Failed to load images", error));
  };

  // Notify parent component when image changes (if callback provided)
  useEffect(() => {
    if (onImageChange && loadedImages.length > 0) {
      onImageChange(loadedImages[currentIndex]);
    }
  }, [currentIndex, loadedImages, onImageChange]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // autoplay with delay
    let interval: NodeJS.Timeout;
    if (autoplay) {
      // Add the initial delay
      const timeoutId = setTimeout(() => {
        interval = setInterval(() => {
          handleNext();
        }, 5000); // Set to 5 seconds as requested
      }, delay);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timeoutId);
        clearInterval(interval);
      };
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-fill object-center"
          />
        </AnimatePresence>
      )}
    </div>
  );
};

export const ImagesSliderDemo = () => {
  // All available images
  const allImages = [
    "/swapify.png",
    "/cuschool.png",
    "/global.png",
    "/disneyclone.png",
    "/walmart.png",
    "/booking.png",
    "/axios.PNG",
    "/secret.jpeg",
    "/dbank.png",
    "/wholesale.png",
  ];

  return (
    <div>
      <div className="flex flex-col max-w-7xl mx-auto pt-10 mb-44 px-10 md:px-20 lg:px-32">
        <div className="text-center pt-10 pb-20">
          <h1 className="font-['Playfair_Display'] text-[#B8860B] font-bold text-lg md:text-2xl tracking-[5px] leading-6 uppercase relative inline-block opacity-80 pb-1">
            Other projects
            <div className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
          </h1>
        </div>

        {/* Small screens - show 1 slider */}
        <div className="block md:hidden w-full">
          <div className="h-64 relative overflow-hidden">
            <ImagesSlider
              images={allImages}
              autoplay={true}
              delay={0}
              startIndex={0}
              direction="up"
              className="h-full"
              overlay={false}
            />
          </div>
        </div>

        {/* Medium screens - show 2 sliders in a row */}
        <div className="hidden md:flex lg:hidden w-full space-x-6">
          {[0, 1].map((index) => (
            <div key={index} className="h-64 w-1/2 relative overflow-hidden ">
              <ImagesSlider
                images={allImages}
                autoplay={true}
                delay={index * 1000}
                startIndex={index}
                direction={index % 2 === 0 ? "up" : "down"}
                className="h-full"
                overlay={false}
              />
            </div>
          ))}
        </div>

        {/* Large screens - show 4 sliders in a row */}
        <div className="hidden lg:flex w-full space-x-6">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="h-64 w-1/4 relative overflow-hidden ">
              <ImagesSlider
                images={allImages}
                autoplay={true}
                delay={index * 1000}
                startIndex={index}
                direction={index % 2 === 0 ? "up" : "down"}
                className="h-full"
                overlay={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesSliderDemo;
