import '../scss/style.scss'
import '../scss/hero-section.scss'
import '../scss/about-section.scss'
import '../scss/what-i-do.scss'
import '../scss/projects-section.scss'
import '../scss/footer.scss'
import '../scss/thanks.scss'

// Hero section

const heroSection = document.querySelector('.hero')
const heroWebDevTxt = document.querySelector('.hero-content h2');
const heroFullNameTxt = document.querySelector('.hero-content h1');
const heroHello = document.querySelector('.hero-content .hello');
const heroWelcome = document.querySelector('.hero-content .welcome');


let heroObserverOptions = {
    threshold: 0.0,
}
function heroScrollAnim() {
    const scrollY = window.scrollY - heroStart;
    const ratio = Math.min(Math.max(scrollY / heroAnimDuration), 1);

    if (!heroTicking) {
        window.requestAnimationFrame(() => {
            heroWebDevTxt.style.transform = `translateX(${ratio * 50}vh)`;
            heroWebDevTxt.style.opacity = `${0.7 - ratio}`;
            heroFullNameTxt.style.transform = `translateX(-${ratio * 50}vh)`;
            heroFullNameTxt.style.opacity = `${0.6 - ratio}`;
            heroHello.style.opacity = `${0.6 - ratio}`;
            heroWelcome.style.opacity = `${0.6 - ratio}`;

            heroTicking = false
        })
        heroTicking = true;
        }
}
let heroTicking = false;
let heroEntry;
let heroStart;
let heroStartAnim;
let heroEndAnim;
let heroAnimDuration;

function heroObserverCallback(entries) {
    entries.forEach(entry => {
        heroEntry = entry
        heroStart = window.scrollY + heroEntry.boundingClientRect.top;
        heroStartAnim = heroStart;
        heroEndAnim = heroStartAnim + window.innerHeight;
        heroAnimDuration = heroEndAnim - heroStartAnim
        if (entry.isIntersecting) document.addEventListener('scroll', heroScrollAnim)
        else document.removeEventListener('scroll', heroScrollAnim)
    })
}
let heroObserver = new IntersectionObserver(heroObserverCallback, heroObserverOptions)
heroObserver.observe(heroSection)


// About title
const aboutTitle = document.querySelector('.about-title');
const aboutTitleElement = document.querySelector('.about-title h2');

let aboutTitleObserverOptions = {
    threshold: 0.0,
}
let aboutTitleTicking = false;
let aboutTitleEntry;
let aboutTitleStart;
let aboutTitleStartAnim;
let aboutTitleEndAnim;
let aboutTitleAnimDuration;

function aboutTitleScrollAnim() {
    const scrollY = window.scrollY - aboutTitleStart;
    const ratio = Math.min(Math.max(scrollY / aboutTitleAnimDuration, 0), 1);
    if (!aboutTitleTicking) {
        window.requestAnimationFrame(() => {
            // if(ratio < 0.5) {
            // let _ratio = ratio/0.5
                let _ratio = ratio
                aboutTitleElement.style.transform = `translate(-50%, -50%) translateY(-${((1 - _ratio)) * 50}px)`;
                aboutTitleElement.style.opacity = `${_ratio}`;
            // }
            // else if (ratio > 0.5) {
            //     let _ratio = (ratio - 0.5) / 0.5
            //     aboutTitleElement.style.transform = `translate(-50%, -50%) translateY(-${ratio * 50}px)`;
            //     aboutTitleElement.style.opacity = `${1-ratio}`;
            // }
            aboutTitleTicking = false
        })
        aboutTitleTicking = true;
    }
}
function aboutTitleObserverCallback(entries) {
    entries.forEach(entry => {
        aboutTitleEntry = entry
        aboutTitleStart = window.scrollY + aboutTitleEntry.boundingClientRect.top;
        aboutTitleStartAnim = aboutTitleStart;
        aboutTitleEndAnim = aboutTitleStartAnim + (aboutTitleEntry.boundingClientRect.height - (window.innerHeight));
        aboutTitleAnimDuration = aboutTitleEndAnim - aboutTitleStartAnim
        if (entry.isIntersecting) document.addEventListener('scroll', aboutTitleScrollAnim)
        else document.removeEventListener('scroll', aboutTitleScrollAnim)
    })
}

let aboutTitleObserver = new IntersectionObserver(aboutTitleObserverCallback, aboutTitleObserverOptions)
aboutTitleObserver.observe(aboutTitle)

// About Text
const aboutText = document.querySelector('.about-text');

let textPos = 0
let texts = Array.from(
    aboutText.querySelectorAll('p')).map(
    el => {
        const height = el.getBoundingClientRect().height

        const obj = {
            el: el,
            height: height,
            pos: textPos,
            posStart: textPos,
            posEnd: textPos + height
        }
        textPos += height
        return obj
    });

let aboutTextObserverOptions = {
    threshold: 0.0,
}
let aboutTextTicking = false;
let aboutTextEntry;
let aboutTextStart;
let aboutTextStartAnim;
let aboutTextEndAnim;
let aboutTextAnimDuration;

function aboutTextScrollAnim() {
    const scrollY = window.scrollY - aboutTextStartAnim;
    const ratio = Math.min(Math.max(scrollY / (aboutTextAnimDuration), 0), 1);
    if (!aboutTextTicking) {
        window.requestAnimationFrame(() => {
            texts.forEach(el => {
                const elCenterEnd = (window.innerHeight / 2) + el.posEnd
                const dY = Math.abs(scrollY - elCenterEnd);
                let ratio = 1 - (dY / (el.height * 3));
                el.el.style.opacity = `${ratio}`;
                el.el.style.filter = `blur(${1 - ratio * 1}px)`;
            })
            aboutTextTicking = false
        })
        aboutTextTicking = true;
    }
}

function aboutTextObserverCallback(entries) {
    entries.forEach(entry => {
        aboutTextEntry = entry
        aboutTextStart = window.scrollY + aboutTextEntry.boundingClientRect.top;
        // full cover
        aboutTextStartAnim = aboutTextStart - (window.innerHeight);
        aboutTextEndAnim = aboutTextStartAnim + entry.boundingClientRect.height + window.innerHeight;

        aboutTextAnimDuration = aboutTextEndAnim - aboutTextStartAnim
        if (entry.isIntersecting) document.addEventListener('scroll', aboutTextScrollAnim)
        else document.removeEventListener('scroll', aboutTextScrollAnim)
    })
}

let aboutTextObserver = new IntersectionObserver(aboutTextObserverCallback, aboutTextObserverOptions)
aboutTextObserver.observe(aboutText)


// What I Do
const whatIDoSection = document.querySelector('.what-i-do');

const whatIDoContent = whatIDoSection.querySelector('.content');
const whatIDoContentChildren = Array.from(whatIDoContent.children)
let whatIDoTotalWidth = whatIDoContentChildren.reduce((accumulator, currentValue) => accumulator + currentValue.clientWidth, 0)
whatIDoSection.style.height = `${whatIDoTotalWidth}px`

let whatIDoObserverOptions = {
    threshold: 0.0,
}
let whatIDoTicking = false;
let whatIDoEntry;
let whatIDoStart;
let whatIDoStartAnim;
let whatIDoEndAnim;
let whatIDoAnimDuration;

let whatIDodisapearStartAnim;
let whatIDodisapearEndAnim;
let whatIDodisapearAnimDuration;

function whatIDoScrollAnim() {
    const scrollY = window.scrollY - whatIDoStartAnim;
    const disapearScrollY = window.scrollY - whatIDodisapearStartAnim;
    const ratio = Math.min(Math.max(scrollY / (whatIDoAnimDuration), 0), 1);
    const disapearRatio = Math.min(Math.max(disapearScrollY / (whatIDodisapearAnimDuration), 0), 1);
    if (!whatIDoTicking) {
        window.requestAnimationFrame(() => {
            whatIDoContent.style.transform = `translateX(-${(whatIDoTotalWidth - (whatIDoTotalWidth / whatIDoContentChildren.length)) * ratio}px)`;
            whatIDoContent.style.opacity = `${1-disapearRatio}`;
            console.log(disapearRatio);
            whatIDoTicking = false
        })
        whatIDoTicking = true;
    }
}

function whatIDoObserverCallback(entries) {
    entries.forEach(entry => {
        whatIDoEntry = entry
        whatIDoStart = window.scrollY + whatIDoEntry.boundingClientRect.top;
        //
        whatIDoStartAnim = whatIDoStart;
        whatIDoEndAnim = whatIDoStartAnim + entry.boundingClientRect.height - window.innerHeight;

        whatIDoAnimDuration = whatIDoEndAnim - whatIDoStartAnim

        whatIDodisapearStartAnim = whatIDoEndAnim;
        whatIDodisapearEndAnim = whatIDodisapearStartAnim + (window.innerHeight/5);
        whatIDodisapearAnimDuration = whatIDodisapearEndAnim - whatIDodisapearStartAnim;

        whatIDoAnimDuration = whatIDoEndAnim - whatIDoStartAnim
        if (entry.isIntersecting) document.addEventListener('scroll', whatIDoScrollAnim)
        else document.removeEventListener('scroll', whatIDoScrollAnim)
    })
}

let whatIDoObserver = new IntersectionObserver(whatIDoObserverCallback, whatIDoObserverOptions)
whatIDoObserver.observe(whatIDoSection)



// projects section
const projectsSection = document.querySelector('.projects-section');

//project title
const projectTitleWrapper = projectsSection.querySelector('.title-wrapper');

const projectTitleTop = projectTitleWrapper.querySelector('.top');
const projectTitleBottom = projectTitleWrapper.querySelector('.bottom');


let projectTitleObserverOptions = {
    threshold: 0.0,
}
let projectTitleTicking = false;
let projectTitleEntry;
let projectTitleStart;
let projectTitleStartAnim;
let projectTitleEndAnim;
let projectTitleAnimDuration;

function projectTitleScrollAnim() {
    const scrollY = window.scrollY - projectTitleStartAnim;
    const ratio = Math.min(Math.max(scrollY / (projectTitleAnimDuration), 0), 1);
    if (!projectTitleTicking) {
        window.requestAnimationFrame(() => {
            if(ratio < 0.5) {
                let _ratio = ratio/0.5
                projectTitleTop.style.transform = `translate(-50%, ${-100 + (100 * _ratio)}%)`
                projectTitleTop.style.opacity = `${_ratio}`
                projectTitleBottom.style.transform = `translate(-50%, ${100 - (100 * _ratio)}%)`
                projectTitleBottom.style.opacity = `${_ratio}`
            } else if (ratio > 0.5) {
                let _ratio = (ratio - 0.5) / 0.5

                projectTitleTop.style.transform = `translate(${(-50 + (_ratio * 10))}%, 0%)`
                projectTitleBottom.style.transform = `translate(${(-50 - (_ratio * 10))}%, 0%)`
            }
            projectTitleTicking = false
        })
        projectTitleTicking = true;
    }
}

function projectTitleObserverCallback(entries) {
    entries.forEach(entry => {
        projectTitleEntry = entry
        projectTitleStart = window.scrollY + projectTitleEntry.boundingClientRect.top;
        //
        projectTitleStartAnim = projectTitleStart;
        projectTitleEndAnim = projectTitleStartAnim + entry.boundingClientRect.height - window.innerHeight;

        projectTitleAnimDuration = projectTitleEndAnim - projectTitleStartAnim
        if (entry.isIntersecting) document.addEventListener('scroll', projectTitleScrollAnim)
        else document.removeEventListener('scroll', projectTitleScrollAnim)
    })
}

let projectTitleObserver = new IntersectionObserver(projectTitleObserverCallback, projectTitleObserverOptions)
projectTitleObserver.observe(projectTitleWrapper)



// Projects Image and title anim
const projects = document.querySelectorAll('.project');
projects.forEach((project, idx) => {
    const startAnimElement = project.querySelector('.start-anim')
    const image = startAnimElement.querySelector('.image-el')
    const title = startAnimElement.querySelector('.project-title')

    let projectObserverOptions = {
        threshold: 0.0,
    }

    let projectTicking = false;
    let projectEntry;

    let projectStart;

    let projectStartAnim;
    let projectEndAnim;

    let projectAnimDuration;

    function projectScrollAnim() {
        let scrollY = window.scrollY - projectStartAnim;
        const ratio = Math.min(Math.max(scrollY / (projectAnimDuration), 0), 1);
        if (!projectTicking) {
            window.requestAnimationFrame(() => {
                const imageScale = Math.min(Math.max((1.5 - (ratio * 1.5)), 1))
                const titleScale = Math.min(Math.max((2 - (ratio * 3.5)), 1))
                image.style.transform = `scale(${imageScale})`;
                title.style.transform = `scale(${titleScale}) translateY(calc(${ratio * -50}% - 10vh))`;
                projectTicking = false
            })
            projectTicking = true;
        }
    }

    function projectObserverCallback(entries) {
        entries.forEach(entry => {
            projectEntry = entry
            projectStart = window.scrollY + projectEntry.boundingClientRect.top;
                                                                    // Padding
            projectStartAnim = projectStart + (entry.boundingClientRect.height / 2) - window.innerHeight + (window.innerHeight * 0.1);
            projectEndAnim = projectStartAnim + (entry.boundingClientRect.height);
            projectAnimDuration = projectEndAnim - projectStartAnim

            if (entry.isIntersecting) document.addEventListener('scroll', projectScrollAnim)
            else document.removeEventListener('scroll', projectScrollAnim)
        })
    }
    let projectObserver = new IntersectionObserver(projectObserverCallback, projectObserverOptions)
    projectObserver.observe(startAnimElement)
})

// Projects image an title disapear when description appear
projects.forEach((project, idx) => {
    const startAnimElement = project.querySelector('.start-anim')
    const descriptionElement = project.querySelector('.description')

    let projectObserverOptions = {
        threshold: 0.0,
    }

    let projectTicking = false;
    let projectEntry;

    let projectStart;

    let projectStartAnim;
    let projectEndAnim;

    let projectAnimDuration;

    function projectScrollAnim() {
        let scrollY = window.scrollY - projectStartAnim;
        const ratio = Math.min(Math.max(scrollY / (projectAnimDuration), 0), 1);
        if (!projectTicking) {
            window.requestAnimationFrame(() => {
                startAnimElement.style.opacity = `${1-ratio}`;
                projectTicking = false
            })
            projectTicking = true;
        }
    }

    function projectObserverCallback(entries) {
        entries.forEach(entry => {
            projectEntry = entry
            projectStart = window.scrollY + projectEntry.boundingClientRect.top;
            //
            projectStartAnim = projectStart - window.innerHeight;
            projectEndAnim = projectStartAnim + entry.boundingClientRect.height;
            projectAnimDuration = projectEndAnim - projectStartAnim

            if (entry.isIntersecting) document.addEventListener('scroll', projectScrollAnim)
            else document.removeEventListener('scroll', projectScrollAnim)
        })
    }
    let projectObserver = new IntersectionObserver(projectObserverCallback, projectObserverOptions)
    projectObserver.observe(descriptionElement)
})

// Projects Description Disappear
projects.forEach((project, idx) => {
    const descriptionWrapper = project.querySelector('.description-wrapper')
    const descriptionElement = project.querySelector('.description')

    let projectObserverOptions = {
        threshold: 0.0,
    }

    let projectTicking = false;
    let projectEntry;

    let projectStart;

    let projectStartAnim;
    let projectEndAnim;

    let projectAnimDuration;

    function projectScrollAnim() {
        let scrollY = window.scrollY - projectStartAnim;
        const ratio = Math.min(Math.max(scrollY / (projectAnimDuration), 0), 1);

        if (!projectTicking) {
            window.requestAnimationFrame(() => {
                descriptionElement.style.opacity = `${1-ratio}`;
                projectTicking = false
            })
            projectTicking = true;
        }
    }

    function projectObserverCallback(entries) {
        entries.forEach(entry => {
            projectEntry = entry
            projectStart = window.scrollY + projectEntry.boundingClientRect.top;
            //
            projectStartAnim = projectStart;
            projectEndAnim = projectStartAnim + entry.boundingClientRect.height - window.innerHeight;
            projectAnimDuration = projectEndAnim - projectStartAnim

            if (entry.isIntersecting) document.addEventListener('scroll', projectScrollAnim)
            else document.removeEventListener('scroll', projectScrollAnim)
        })
    }
    let projectObserver = new IntersectionObserver(projectObserverCallback, projectObserverOptions)
    projectObserver.observe(descriptionWrapper)
})


// thanks
const thanks = document.querySelector('.thanks');


const thanksStickyWrapper = thanks.querySelector('.sticky-wrapper');

let thanksObserverOptions = {
    threshold: 0.0,
}

let thanksTicking = false;
let thanksEntry;

let thanksStart;

let thanksStartAnim;
let thanksEndAnim;

let thanksAnimDuration;

function thanksScrollAnim() {
    let scrollY = window.scrollY - thanksStartAnim;
    const ratio = Math.min(Math.max(scrollY / (thanksAnimDuration), 0), 1);
    if (!thanksTicking) {
        window.requestAnimationFrame(() => {
            console.log(scrollY, window.scrollY, thanksStartAnim,thanksEndAnim, thanksAnimDuration, ratio)
            thanksStickyWrapper.style.opacity = `${1-ratio}`;
            thanksTicking = false
        })
        thanksTicking = true;
    }
}

function thanksObserverCallback(entries) {
    entries.forEach(entry => {
        thanksEntry = entry
        thanksStart = window.scrollY + thanksEntry.boundingClientRect.top;
        //
        thanksStartAnim = thanksStart;
        thanksEndAnim = thanksStartAnim + window.innerHeight;
        thanksAnimDuration = thanksEndAnim - thanksStartAnim

        if (entry.isIntersecting) document.addEventListener('scroll', thanksScrollAnim)
        else document.removeEventListener('scroll', thanksScrollAnim)
    })
}
let thanksObserver = new IntersectionObserver(thanksObserverCallback, thanksObserverOptions)
thanksObserver.observe(thanks)
// Footer
const footer = document.querySelector('footer');


const footerContactLink = footer.querySelector('.contact-link');
const footerFullName = footer.querySelector('.full-name');
const footerWebDev = footer.querySelector('.web-dev');
const footerSocial = footer.querySelector('.social');

let footerObserverOptions = {
    threshold: 0.0,
}

let footerTicking = false;
let footerEntry;

let footerStart;

let footerStartAnim;
let footerEndAnim;

let footerAnimDuration;

function footerScrollAnim() {
    let scrollY = window.scrollY - footerStartAnim;
    const ratio = Math.min(Math.max(scrollY / (footerAnimDuration), 0), 1);
    if (!footerTicking) {
        window.requestAnimationFrame(() => {
            footerContactLink.style.opacity = `${ratio}`;
            footerContactLink.style.transform = `translate(0%, ${((-300 + (300 * ratio)))}%)`;

            footerFullName.style.opacity = `${ratio}`;
            footerFullName.style.transform = `translate(${(-100 + (100 * ratio))}%)`

            footerWebDev.style.opacity = `${ratio}`;
            footerWebDev.style.transform = `translate(${(100 - (100 * ratio))}%)`

            footerSocial.style.opacity = `${ratio}`;
            footerSocial.style.transform = `translate(0%, ${(300 - (300 * ratio))}%)`
            footerTicking = false
        })
        footerTicking = true;
    }
}

function footerObserverCallback(entries) {
    entries.forEach(entry => {
        footerEntry = entry
        footerStart = window.scrollY + footerEntry.boundingClientRect.top;
        //
        footerStartAnim = footerStart;
        footerEndAnim = footerStartAnim + entry.boundingClientRect.height - window.innerHeight;
        footerAnimDuration = footerEndAnim - footerStartAnim

        if (entry.isIntersecting) document.addEventListener('scroll', footerScrollAnim)
        else document.removeEventListener('scroll', footerScrollAnim)
    })
}
let footerObserver = new IntersectionObserver(footerObserverCallback, footerObserverOptions)
footerObserver.observe(footer)