import { useMediaQuery } from "react-responsive"
import { performanceImages, performanceImgPositions } from "../constants"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Performance = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px) and (min-width: 600px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 599px)' });

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
      if (pos.id === 'p5') return;
      let position = {};
      if (isMobile && pos.mobile) position = pos.mobile;
      else if (isTablet && pos.tablet) position = pos.tablet;
      else if (pos.desktop) position = pos.desktop;
      const toVars = {};
      if (position.left !== undefined) toVars.left = `${position.left}%`;
      if (position.right !== undefined) toVars.right = `${position.right}%`;
      if (position.bottom !== undefined) toVars.bottom = `${position.bottom}%`;
      if (position.transform !== undefined) toVars.transform = position.transform;
      tl.to(`.${pos.id}`, toVars, 0);
    });
  }, { scope: sectionRef, dependencies: [isMobile, isTablet] });

  // Helper to get the correct position for each device
  const getImgStyle = (id) => {
    const pos = performanceImgPositions.find(p => p.id === id);
    if (!pos) return {};
    let position = {};
    if (isMobile && pos.mobile) position = pos.mobile;
    else if (isTablet && pos.tablet) position = pos.tablet;
    else if (pos.desktop) position = pos.desktop;
    // Convert to style object
    const style = {};
    if (position.left !== undefined) style.left = `${position.left}%`;
    if (position.right !== undefined) style.right = `${position.right}%`;
    if (position.bottom !== undefined) style.bottom = `${position.bottom}%`;
    if (position.top !== undefined) style.top = `${position.top}%`;
    if (position.transform !== undefined) style.transform = position.transform;
    style.position = 'absolute';
    return style;
  };

  return (
    <section id='performance' ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper" style={{ position: 'relative' }}>
        {performanceImages.map(({ id, src }) => (
          <img key={id} src={src} alt={id} className={id} style={getImgStyle(id)} />
        ))}
      </div>

      <div className="content">
        <p className="description">
          Run graphics-intensive workflows with a responsiveness that keeps with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders images faster, so 
            <span className="text-white">
              {' '}
              gaming feels more immersive and realistic than ever.
              {' '}
            </span> 
          And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU utilization - driving a huge performance boost for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  )
}

export default Performance