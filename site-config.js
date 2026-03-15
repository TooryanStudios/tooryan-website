window.TOORYAN_DEFAULTS = {
    heroEyebrow: 'Oman Based Digital Animation Studio',
    heroTitleHtml: 'Building <span class="stroke">cinematic worlds</span> for modern brands.',
    heroDescription: 'Tooryan Studios creates bold animation, digital art, and visual storytelling that feels premium, dimensional, and unforgettable. We merge Omani identity with futuristic motion design.',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    heroCard1Label: 'Feature Film Energy',
    heroCard1Title: 'Motion with Depth',
    heroCard1Text: 'Layered scenes, dramatic lighting, and visual rhythm that feels like an opening sequence.',
    heroCard2Label: 'Studio Signature',
    heroCard2Title: 'Culture Reimagined',
    heroCard2Text: 'Traditional identity translated into contemporary, digital-first visual language.',
    heroCard3Label: 'Interactive Direction',
    heroCard3Title: '3D Presence',
    heroCard3Text: 'Depth, glass surfaces, kinetic motion, and premium transitions across every touchpoint.',
    featuredHeading: 'Not flat portfolio cards. Worlds with atmosphere, motion, and presence.',
    featuredText: 'A luxury cinematic homepage should feel visual first. These placeholders can be replaced later from the admin page.',
    featuredMainBadge: 'Hero Project / Mazen Series',
    featuredMainLabel: 'Animation Universe',
    featuredMainTitle: 'Mazen Series',
    featuredMainImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80',
    featuredStat1Title: 'Storyboard',
    featuredStat1Text: 'Concept to visual narrative',
    featuredStat2Title: 'Lighting',
    featuredStat2Text: 'Cinematic mood and depth',
    featuredStat3Title: 'Motion',
    featuredStat3Text: 'Rhythm built for screen impact',
    side1Title: 'Ibn Al Dahabi',
    side1Text: 'A refined motion direction for broadcast storytelling, balancing visual clarity with emotional weight.',
    side1Image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    side2Title: 'Saudi Arabian Reading',
    side2Text: 'Editorial visual language, stylized composition, and modern digital art framing for educational impact.',
    side2Image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    service1Title: '3D Animation',
    service1Text: 'Immersive character motion, stylized environments, title sequences, and cinematic scene construction for high-impact storytelling.',
    service2Title: 'Video Production',
    service2Text: 'Direction, editing, transitions, pacing, and visual narrative systems crafted to elevate commercial and broadcast communication.',
    service3Title: 'Digital Art',
    service3Text: 'Original concept visuals and polished artwork infused with regional character, contemporary styling, and strong composition.',
    visionTitle: 'Tooryan is where heritage becomes spectacle.',
    visionText: 'We turn story, symbolism, and identity into advanced digital visuals that feel modern on a global stage.',
    floatingImg1: 'https://assets.codepen.io/16327/flair-1.png',
    floatingImg2: 'https://assets.codepen.io/16327/flair-2.png',
    floatingImg3: 'https://assets.codepen.io/16327/flair-3.png',
    quote: 'A stronger front page should feel like entering a visual world, not reading a brochure.',
    contactTitle: 'Let’s create your next visual experience.',
    contactText: 'For brand films, series visuals, animation, digital art, and premium storytelling systems.',
    phone: '+968 9211 7587',
    email: 'tooryanart@gmail.com',
    location: 'Oman'
};

window.getTooryanContent = function () {
    try {
        const stored = localStorage.getItem('tooryanSiteContent');
        if (!stored) {
            return { ...window.TOORYAN_DEFAULTS };
        }
        return { ...window.TOORYAN_DEFAULTS, ...JSON.parse(stored) };
    } catch (error) {
        return { ...window.TOORYAN_DEFAULTS };
    }
};

window.saveTooryanContent = function (content) {
    localStorage.setItem('tooryanSiteContent', JSON.stringify(content));
};

window.resetTooryanContent = function () {
    localStorage.removeItem('tooryanSiteContent');
};
