import { useMediaQuery } from "react-responsive"
import { performanceImages, performanceImgPositions } from "../constants"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Performance = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)'});
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.fromTo(".description", {
      opacity: 0,
      y: 10,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: '.description',
        start: 'top 90%',
        end: 'top center',
        scrub: true,
        invalidateOnRefresh: true,
      }
    })

    if(isMobile) return;

    const tl = gsap.timeline({
      defaults: {
        ease: 'power1.inOut',
        duration: 2,
        overwrite: 'auto'
      },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'center center',
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    performanceImgPositions.forEach((pos) => {
      if(pos.id === 'p5') return;

      const toVars = {};

      if(pos.left !== undefined) toVars.left = `${pos.left}%`;
      if(pos.right !== undefined) toVars.right = `${pos.right}%`;
      if(pos.bottom !== undefined) toVars.bottom = `${pos.bottom}%`;
      if(pos.transform !== undefined) toVars.transform = `${pos.transform}%`;

      tl.to(`.${pos.id}`, toVars, 0);
    })
  }, { scope: sectionRef, dependencies: [isMobile] });

  return (
    <section id='performance' ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map(({ id, src }) => (
          <img key={id} src={src} alt={id} className={id} />
        ))}
      </div>

      <div className="content">
        <p className="description">
          Run graphics-intensive workflows with a responsiveness that keeps with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders images faster, so 
            <span className="text-white">gaming feels more immersive and realistic than ever.
            </span> 
          And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU utilization - driving a huge performance boost for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  )
}

export default Performance