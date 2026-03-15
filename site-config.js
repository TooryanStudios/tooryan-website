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
    floatingImg1: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjgwIiBmaWxsPSJub25lIiBzdHJva2U9IiNkNGFmMzciIHN0cm9rZS13aWR0aD0iNCIgb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI2MCIgZmlsbD0iI2Q0YWYzNyIgb3BhY2l0eT0iMC4yIi8+PC9zdmc+',
    floatingImg2: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTAwIiByeD0iOTAiIHJ5PSIzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDRhZjM3IiBzdHJva2Utd2lkdGg9IjYiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==',
    floatingImg3: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI1IiBmaWxsPSIjZDRhZjM3Ii8+PGNpcmNsZSBjeD0iODAiIGN5PSI1MCIgcj0iOCIgZmlsbD0iI2Q0YWYzNyIgb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iNDAiIGN5PSI4MCIgcj0iMyIgZmlsbD0iI2Q0YWYzNyIvPjwvc3ZnPg==',
    quote: 'A stronger front page should feel like entering a visual world, not reading a brochure.',
    contactTitle: 'Let’s create your next visual experience.',
    contactText: 'For brand films, series visuals, animation, digital art, and premium storytelling systems.',
    phone: '+968 9211 7587',
    email: 'tooryanart@gmail.com',
    location: 'Oman'
};

window.getTooryanContent = async function () {
    try {
        // Try to fetch from server first (add timestamp to bust cache)
        const response = await fetch('data.json?t=' + new Date().getTime());
        if (response.ok) {
            const serverData = await response.json();
            return { ...window.TOORYAN_DEFAULTS, ...serverData };
        }
    } catch (error) {
        console.warn('Could not load data.json from server, falling back to local storage.', error);
    }
    
    // Fallback to local storage
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

window.saveTooryanContent = async function (content) {
    // Save locally as a backup
    localStorage.setItem('tooryanSiteContent', JSON.stringify(content));
    
    // Attempt to save to server
    try {
        const response = await fetch('api/save.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        });
        
        const result = await response.json();
        if(result.status !== 'success') {
            console.error('Server save failed:', result.message);
            alert('Failed to save to server. Saved locally instead. Make sure you are running via a PHP server.');
        }
    } catch (error) {
        console.error('Could not reach save.php', error);
        alert('Could not connect to the server to save. Changes saved locally only. (Are you running PHP?)');
    }
};

window.resetTooryanContent = async function () {
    localStorage.removeItem('tooryanSiteContent');
    await window.saveTooryanContent(window.TOORYAN_DEFAULTS);
};
