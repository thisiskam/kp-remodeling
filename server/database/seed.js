import db from "./client.js"
import { 
    createBlogPost, 
    addBlogContent, } from "./blogs.js";
import {
    createAdmin} from "./admin.js";
import {
    createPreviousWork,
    createPreviousWorkImage} from "./portfolio.js"
import {
    createTestimonialType,
    createTestimonial} from "./testimonials.js"

// ----- CREATE TABLES ---------------------------------------------------------------------------

const dropTables = async () => {
    try {
        await db.query(/*sql*/`
            DROP TABLE IF EXISTS quote_work_categories CASCADE;
            DROP TABLE IF EXISTS quotes CASCADE;
            DROP TABLE IF EXISTS pricing CASCADE;
            DROP TABLE IF EXISTS finishes CASCADE;
            DROP TABLE IF EXISTS work_categories CASCADE;
            DROP TABLE IF EXISTS job_type CASCADE;
            DROP TABLE IF EXISTS admins CASCADE;
            DROP TABLE IF EXISTS blogs CASCADE;
            DROP TABLE IF EXISTS blog_content CASCADE;
            DROP TABLE IF EXISTS previous_work_images CASCADE;
            DROP TABLE IF EXISTS previous_work CASCADE;
            DROP TABLE IF EXISTS testimonials CASCADE;
            DROP TABLE IF EXISTS testimonial_type CASCADE;
            `)
            console.log("tables dropped successfully");
            
    } catch (error) {
        console.log("error dropping tables", error);
        
    }
}

const createTables = async () => {
    try {
        await db.query(/*sql*/`
            CREATE TABLE blogs(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                summary TEXT NOT NULL,
                header_img VARCHAR(1000) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            CREATE TABLE blog_content(
                id SERIAL PRIMARY KEY,
                blog_id INTEGER REFERENCES blogs(id) ON DELETE CASCADE,
                content_type VARCHAR(255) NOT NULL,
                content VARCHAR(1000) NOT NULL,
                position INTEGER NOT NULL,
                CONSTRAINT unique_blog_position UNIQUE (blog_id, position),
                bs_styles VARCHAR(1000) NOT NULL
            );
            CREATE TABLE previous_work(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                work_description TEXT NOT NULL
            );
            CREATE TABLE previous_work_images(
                id SERIAL PRIMARY KEY,
                previous_work_id INTEGER REFERENCES previous_work(id) ON DELETE CASCADE,
                image_url VARCHAR(1000) NOT NULL
            );
            CREATE TABLE admins(
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
            CREATE TABLE job_type(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
            CREATE TABLE work_categories(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
            CREATE TABLE finishes(
                id SERIAL PRIMARY KEY,
                category_id INTEGER REFERENCES work_categories(id) ON DELETE CASCADE,
                name VARCHAR(255) NOT NULL,
                modifier NUMERIC(10, 2) NOT NULL
            );
            CREATE TABLE pricing (
                id SERIAL PRIMARY KEY,
                category_id INTEGER REFERENCES work_categories(id) ON DELETE CASCADE,
                base_price NUMERIC(10, 2) NOT NULL,
                unit_type VARCHAR(50) NOT NULL CHECK (unit_type IN ('sqft', 'linearft', 'unit'))
            );
            CREATE TABLE quotes (
                id SERIAL PRIMARY KEY,
                job_type_id INTEGER REFERENCES job_type(id) ON DELETE CASCADE,
                total_price NUMERIC(10, 2) NOT NULL DEFAULT 0
            );
            CREATE TABLE quote_work_categories (
                id SERIAL PRIMARY KEY,
                quote_id INTEGER REFERENCES quotes(id) ON DELETE CASCADE,
                category_id INTEGER REFERENCES work_categories(id) ON DELETE CASCADE,
                finish_id INTEGER REFERENCES finishes(id),
                quantity NUMERIC(10, 2) NOT NULL,
                unit_price NUMERIC(10, 2) NOT NULL,
                total_price NUMERIC(10, 2) NOT NULL
            );
            CREATE TABLE testimonial_type(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                link TEXT,
                image_url VARCHAR(1000) NOT NULL
            );
            CREATE TABLE testimonials(
                id SERIAL PRIMARY KEY,
                customer VARCHAR(255) NOT NULL,
                review TEXT NOT NULL,
                review_type INTEGER NOT NULL REFERENCES testimonial_type(id),
                review_date DATE DEFAULT CURRENT_DATE
            );
            `)
        console.log("Tables created successfully!");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

//----- USER DATA -------------------------------------------------------------------

const admins = [
    {
        username: 1001,
        password: "TheCreator12"
    },
    {
        username: 1002,
        password: "TheOwner57"
    },
    {
        username: 1003,
        password: "TheManager92"
    }
]

//----- SEED ADMINS -------------------------------------------------------------------

const insertAdmins = async () => {
    try {
        for (const admin of admins) {
            await createAdmin({
                username: admin.username,
                password: admin.password
            })
        }
        console.log("admins seeded successfully ");
        
    } catch (error) {
        console.log(error, "unable to seed admins");
        
    }
}

//----- INITIAL BLOG DATA ------------------------------------------------------------

const blogs  = [
    {
        title: "Should you paint your cabinets, or install new ones?",
        summary: "Cabinets are the centerpiece of a kitchen remodel. They make a statement visually and make up a large portion of the kitchen's overall functionality. Now that the decision is made to overhaul the kitchen, it may be daunting to figure out the best course of action to take with such an integral element. Let’s break down a few factors that could help take off some of that pressure.",
        header_img: "/blog/blog-image-painting-cabinets-1.jpg"
    },
    {
        title: "Know your tile edging options",
        summary: "There are countless different options when it comes to tile. Often times what gets neglected when picking out tile is the type of edging you’ll use. What is edging?",
        header_img: "/blog/blog-image-tile-trims-6.jpg"
    },
    {
        title: "Kitchen remodel and your homes resale value",
        summary: "For some people value is everything. If that’s you, than its really important to know wether the money you pay for your kitchen remodel will translate to an increase in your homes value. The short answer is that it will. Theres some factors, though, that dictate how high of a percentage you’ll recoup.",
        header_img: "/blog/blog-image-kitchen-remodel-1.jpg"
    },
]

//----- INSERT INITIAL BLOGS ---------------------------------------------------------

const insertBlogs = async () => {
    try {
        for (const blog of blogs) {
            await createBlogPost({
                title: blog.title,
                summary: blog.summary,
                header_img: blog.header_img
            })
        }
        console.log("blogs seeded successfully.");
        
    } catch (error) {
        console.log("error seeding blogs", error);
        
    }
}

//----- BLOG IMAGES ------------------------------------------------------------------

const blogContent= [
    {
        blog_id: "1",
        content_type: "text",
        content: "Cabinets are the centerpiece of a kitchen remodel. They make a statement visually and make up a large portion of the kitchens overall functionality. Now that the decision is made to overhaul the kitchen it may be daunting to figure out the best course of action to take with such a integral element. Let’s break down a few factors that could help take off some of that pressure.",
        position: "1",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "header",
        content: "The Condition of the Existing Cabinets",
        position: "2",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "This is the first thing to look at when deciding if your cabinets just need a refresh or if they need to go. Theres a few thing you can look at to see if your cabinets are in good shape.",
        position: "3",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Cabinet Boxes: ",
        position: "4",
        bs_styles: "fw-bold d-inline"
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Are the cabinet boxes still square or has water damage over the years caused them to distort from their original shape? If there is water damage, no amount of paint will make those cabinets look good. If the damage is minimal, a few repairs can be done before painting. Just keep in mind the more repairs needed the more expensive this will cost.",
        position: "5",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Interior: ",
        position: "6",
        bs_styles: "fw-bold d-inline"
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Are the inside of the cabinets in good shape? This may not bug most people but wear and tear on the inside of the cabinets typically aren’t repaired when painting them.",
        position: "7",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Door and Drawer Faces: ",
        position: "8",
        bs_styles: "fw-bold d-inline"
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "These tend to take the most beating in the kitchen. Stuffs, scratches and nicks will all be fixed when painting. Swelling or peeling paint insinuates a deeper issue thats a lot harder to fix.",
        position: "9",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "If your’e unhappy with the doors there’s always the option of buying new doors and drawers and just painting the cabinet boxes. This option will be discussed later in this article.",
        position: "10",
        bs_styles: "text-secondary col-11 m-auto mb-3"
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Cabinet Materials:",
        position: "11",
        bs_styles: "fw-bold d-inline"
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "It may come as little surprise that some materials are more durable than others. OSB, which most cost efficient cabinets are made of now tends to swell with moisture and steam. Plywood also tends to do this but not quite as bad. Hardwoods are the most durable material for cabinets depending on which type of wood your cabinet is made out of. Plywood and Hardwood cabinets are worth painting where as OSB cabinets will typically need to be replaced completely. ",
        position: "12",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "header",
        content: "Time",
        position: "13",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "When Planning a remodel time tends to be a huge factor. When you’re kitchen is down day to day life becomes a lot harder so you want the project to go as fast as possible.",
        position: "14",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Painting tends to take the longest out of all these options, it is also the most intrusive. Staging will need to be set up to paint the doors meaning for the duration of the project your living room or dining room will also not be accessible. Paint fumes, especially during the priming stage is also a factor to consider.",
        position: "15",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Installing cabinets on the other hand goes quite a bit faster and is less intrusive. The cabinets will come pre-finished so there will be no painting necessary.",
        position: "16",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "header",
        content: "Design and Layout",
        position: "17",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Ultimately if you’re not happy with how the cabinets look or how your kitchen is laid out it may be a good idea just to buy new cabinets.",
        position: "18",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "If it’s just the door and drawer face style that you’re unhappy with, a cheaper option would be to keep the cabinet boxes and just replace those components. This will also give you the option of upgrading to soft-close hinges and door slides.",
        position: "19",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "header",
        content: "Cost",
        position: "20",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "This is such a huge factor when remodeling. With the cost of living on the rise, most homeowners want to get the best upgrade for the most cost-efficient price. Each one of these options tends to vary in price significantly. ",
        position: "21",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Painting: ",
        position: "22",
        bs_styles: "fw-bold d-inline"
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "This tends to be the cheapest option. The price is made up mostly with the cost of labor.",
        position: "23",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "New door and drawer faces: ",
        position: "24",
        bs_styles: "fw-bold d-inline"
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "This still involves painting the cabinets and door and drawer faces but it allows you to upgrade the look of your cabinets. This will be slightly more expensive than painting alone. ",
        position: "25",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "Door and Drawer Faces: ",
        position: "26",
        bs_styles: "fw-bold d-inline"
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "This is the most expensive option. The price will also vary the most depending on the type of cabinets you would like to have as well as the material they’re made of. The cheapest cabinet option will be a OSB and Plywood hybrid, where the most expensive will be you’re hardwoods.",
        position: "27",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "image",
        content: "/blog/blog-image-painting-cabinets-2.jpg",
        position: "28",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "header",
        content: "Wrap-Up",
        position: "29",
        bs_styles: ""
    },
    {
        blog_id: "1",
        content_type: "text",
        content: "There is a lot to consider when planning a kitchen remodel and this is just one of the many facets to weigh. Each situation is different so talking to a licensed contractor will ultimately be the best way to help you get going in a good direction. Click here to schedule a free in-person consultation.",
        position: "30",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "text",
        content: "There are countless different options when it comes to tile. Often times what gets neglected when picking out tile is the type of edging you’ll use. What is edging?",
        position: "1",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "text",
        content: "Typical installs will leave the a side of the tile exposed leaving a strip of color that you may not want in your new perfectly curated space. Something needs to be done here to make that aesthetically pleasing. Consider these options. ",
        position: "2",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "header",
        content: "“Schluter” Edge  (Edge Trim)",
        position: "3",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "text",
        content: "This is a trim piece thats made of stainless steel, coated aluminum or PVC. Several companies make their own versions of this trim and it comes in all different shapes, colors, sizes and options to coordinate with any tile. ",
        position: "4",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "text",
        content: "This method provides the ultimate protection for the edge, is cost efficient and takes minimal effort to install.",
        position: "5",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "image",
        content: "/blog/blog-image-tile-trims-1.jpg",
        position: "6",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "header",
        content: "Bullnose",
        position: "7",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "text",
        content: "Many tile models will come with bullnose pieces to match. These will have the same color and sheen of the field tile with the exception of having one side rounded over and sometimes a different length or width. This works well with subway tile installs and offers a more softened, classic look. Not all tile manufacturers offer this option so make sure its available before ordering your field tile. ",
        position: "8",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "image",
        content: "/blog/blog-image-tile-trims-2.jpg",
        position: "9",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "header",
        content: "Pencil Tile",
        position: "10",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "text",
        content: "These are thin strips of tile that are adhered to the edge of your install. They’re typically about 6” long and about 3/4” wide and are a good option if you want to keep the soft, round look and make the edges stand out. These pieces tend to be very brittle and quite expensive. Make sure your order plenty.",
        position: "11",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "image",
        content: "/blog/blog-image-tile-trims-3.jpg",
        position: "12",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "header",
        content: "Mitered Edge",
        position: "13",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "text",
        content: "This method eliminates the need for trim pieces and extra tile. Rather the both pieces of tile are cut back 45 degrees to give the corner a sharp clean look. This is definitely the cleanest look over them all but is also one of the most brittle. If you’re going to go this route make sure that its an area that doesn’t receive much abuse",
        position: "14",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "image",
        content: "/blog/blog-image-tile-trims-4.jpg",
        position: "15",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "header",
        content: "Polished Edge",
        position: "16",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "text",
        content: "This is the simplest and most cost effective approach since it requires no fancy cuts or trim pieces. Usually all thats done is a quick bevel one the front edge of the tile to remove the sharpness. This is okay for natural stone as well as some porcelain. Before settling on this route, make sure you’re happy with the side color of the tile since this will show. Typically a good rule of thumb is if the side is a relatively close match to the face the edge won’t stand out.",
        position: "17",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "image",
        content: "/blog/blog-image-tile-trims-5.jpg",
        position: "18",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "header",
        content: "Summary",
        position: "19",
        bs_styles: ""
    },
    {
        blog_id: "2",
        content_type: "text",
        content: "The versatility of tile is unmatched which can be exciting and intimidating. If you’re still not sure which edging will work best for the tile you’d like to install don’t hesitate to reach out to us. Click here for a free home consultation or video call.",
        position: "20",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "text",
        content: "For some people value is everything. If that’s you, than its really important to know wether the money you pay for your kitchen remodel will translate to an increase in your homes value. The short answer is that it will. Theres some factors, though, that dictate how high of a percentage you’ll recoup. ",
        position: "1",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "header",
        content: "Quality of Craftsmanship",
        position: "2",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "text",
        content: "This speaks for itself. A poorly done project that looks bad will always have lower value. Make sure you don’t go the cheapest route when looking for a contractor. That being said even the pros who charge a premium could cut corners. Make sure you hire someone you can trust.",
        position: "3",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "text",
        content: "If you do the work yourself don’t rely on you’re own knowledge. Check industry standards and inform yourself about materials and processes",
        position: "4",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "header",
        content: "Know the Numbers",
        position: "5",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "text",
        content: "The more you spend on a remodel the smaller your ROI (return on investment) becomes. Many say that a kitchen remodel should cost between 5% and 15% of your home.",
        position: "6",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "text",
        content: "A light kitchen remodel has the possibility of recouping all its value. Once you start changing cabinets, layout, and adding fancy appliances you’ll start to see the ROI fall to 60% then 50% and even down to 40% if you start creeping into spending a fifth of your homes value on that remodel. ",
        position: "7",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "header",
        content: "Finishes",
        position: "8",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "text",
        content: "Installing cheap materials and very hip designs will date your kitchen fast. Make sure to pick finishes, colors and patterns that work with your own taste but also could possible appeal to someone else’s as well. This is where friends and family come in. Get their honest opinion before you settle. ",
        position: "9",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "header",
        content: "Summary",
        position: "10",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "text",
        content: "While thinking about ROI is important, it isn’t everything. Ultimately this will be the space you spend a large portion of your life and will be a space that draws in your family and friends. ",
        position: "11",
        bs_styles: ""
    },
    {
        blog_id: "3",
        content_type: "text",
        content: "If you would like help to plan your remodel click here for a free consultation at your home or on a video call.",
        position: "12",
        bs_styles: ""
    },
]

//----- SEED BLOG IMAGES -------------------------------------------------------------

const insertBlogContent = async () => {
    try {
        for (const item of blogContent) {
            await addBlogContent({
                blog_id: item.blog_id,
                content_type: item.content_type,
                content: item.content,
                position: item.position,
                bs_styles: item.bs_styles
            })
        }
        console.log("blog content seeded successfully");
    } catch (error) {
        console.log("unable to seed blog content", error);
        
    }
}

//----- INITIAL PREVIOUS_WORK DATA ---------------------------------------------------
const previousWork = [
    {
        title:"Luxury Bathroom",
        description:"In this bathroom we modernized a 90's built bathroom into one our customer wanted to 'live in'. "
    },
    {
        title:"Full Bathroom Remodel",
        description:"In this bathroom remodel some unique things were done, two showerheads, herringbone tile just to name a few."
    },
    {
        title:"Cozy Kitchen Remodel",
        description:"This remodel featured fresh cabinets (custom painted), new countertops, and tile floors."
    },
    {
        title:"Throwback Kitchen Remodel",
        description:"Its your kitchen, pick finishes YOU like. In this remodel our customer went back in time for some style choices, and it works!"
    },
    {
        title:"Small bath, Lots of tile",
        description:"Just cause the bathroom is small, doesnt mean it has to be basic. In this one we went up the walls with tile."
    },
    {
        title:"Small Bathroom Renovations",
        description:"Heres a look at some of the bathroom renovations weve done over the years"
    },
    {
        title:"Showers, Showers, Showers",
        description:"You can say its our specialty, from steam showers to tub surrounds, weve done it all. Check it out."
    },
    {
        title:"Paint Projects",
        description:"Nothing makes a home feel fresher than a new coat of paint, heres some of our paint projects."
    },
    {
        title:"Kitchen Backsplashes",
        description:"We've done an array of different tile schemes in kitchens, heres a look."
    },
    
]

//----- INSERT PREVIOUS_WORK ---------------------------------------------------------

const insertPreviousWork = async () => {
    try{
        for (const item of previousWork) {
            await createPreviousWork({
                title: item.title,
                description: item.description
            })
        }
        console.log("previous work seeded successfully");
    } catch(error) {
        console.log("unable to seed previous work", error);
    }
}

//----- INITIAL PREVIOUS_WORK_IMAGES -------------------------------------------------

const previousWorkImages = [
    {
        workId:"1",
        imageUrl:"/portfolio/tony_5.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_4.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_2.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_3.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_6.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_7.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_8.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_9.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_10.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_11.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_12.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_13.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_14.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_15.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_16.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_17.jpeg"
    },
    {
        workId:"1",
        imageUrl:"/portfolio/tony_18.jpeg"
    },
    {
        workId:"2",
        imageUrl:"/portfolio/sean_4.jpeg"
    },
    {
        workId:"2",
        imageUrl:"/portfolio/sean_1.jpeg"
    },
    {
        workId:"2",
        imageUrl:"/portfolio/sean_2.jpeg"
    },
    {
        workId:"2",
        imageUrl:"/portfolio/sean_3.jpeg"
    },
    {
        workId:"2",
        imageUrl:"/portfolio/sean_5.jpeg"
    },
    {
        workId:"2",
        imageUrl:"/portfolio/sean_6.jpeg"
    },
    {
        workId:"2",
        imageUrl:"/portfolio/sean_7.jpeg"
    },
    {
        workId:"2",
        imageUrl:"/portfolio/sean_8.jpeg"
    },
    {
        workId:"3",
        imageUrl:"/portfolio/greenkitchen_1.jpeg"
    },
    {
        workId:"3",
        imageUrl:"/portfolio/greenkitchen_2.jpeg"
    },
    {
        workId:"3",
        imageUrl:"/portfolio/greenkitchen_3.jpeg"
    },
    {
        workId:"3",
        imageUrl:"/portfolio/greenkitchen_4.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_2.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_1.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_3.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_4.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_5.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_6.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_7.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_8.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_9.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_10.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_11.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_12.jpeg"
    },
    {
        workId:"4",
        imageUrl:"/portfolio/yellowkitchen_13.jpeg"
    },
    {
        workId:"5",
        imageUrl:"/portfolio/tinybath_5.jpeg"
    },
    {
        workId:"5",
        imageUrl:"/portfolio/tinybath_1.jpeg"
    },
    {
        workId:"5",
        imageUrl:"/portfolio/tinybath_2.jpeg"
    },
    {
        workId:"5",
        imageUrl:"/portfolio/tinybath_3.jpeg"
    },
    {
        workId:"5",
        imageUrl:"/portfolio/tinybath_4.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_6.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_4.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_1a.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_1b.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_2a.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_2b.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_2c.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_2d.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_3a.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_3b.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_3c.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_5a.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_5b.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_8a.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_8b.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_8c.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_8d.jpeg"
    },
    {
        workId:"6",
        imageUrl:"/portfolio/smallbath_8e.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_6.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_1.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_2.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_3.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_4.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_5a.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_5b.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_7.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_8.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_9a.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_9b.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_10.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_11.jpeg"
    },
    {
        workId:"7",
        imageUrl:"/portfolio/shower_12.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_1.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_2.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_3.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_4.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_5.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_6.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_7.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_8.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_9.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_10.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_11.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_12.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_13.jpeg"
    },
    {
        workId:"8",
        imageUrl:"/portfolio/painting_14.jpeg"
    },
    {
        workId:"9",
        imageUrl:"/portfolio/backsplash_1.jpeg"
    },
    {
        workId:"9",
        imageUrl:"/portfolio/backsplash_2a.jpeg"
    },
    {
        workId:"9",
        imageUrl:"/portfolio/backsplash_2b.jpeg"
    },
    {
        workId:"9",
        imageUrl:"/portfolio/backsplash_2c.jpeg"
    },
    {
        workId:"9",
        imageUrl:"/portfolio/backsplash_3.jpeg"
    },
    {
        workId:"9",
        imageUrl:"/portfolio/backsplash_4.jpeg"
    },
    
]

//----- SEED PREVIOUS_WORK_IMAGES ----------------------------------------------------

const insertPreviousWorkImages = async () => {
    try {
        for(const item of previousWorkImages) {
            await createPreviousWorkImage({
                previousWorkId: item.workId,
                imageUrl: item.imageUrl
            })
        }
        console.log("previous work images seeded successfully");
        
    } catch (error) {
        console.log("unable to seed previous work images", error);
    }
}

//----- TESTIMONIAL TYPES ------------------------------------------------------------

const testimonialTypes = [
    {
        name:"angi",
        link:"https://www.angi.com/companylist/us/or/portland/crown-point-tile-reviews-10741345.htm",
        image_url:"/angi.svg"
    },
    {
        name:"google",
        link:"https://g.co/kgs/JEXYTec",
        image_url:"/google.svg"
    }

]

//----- SEED TESTIMONIAL TYPES -------------------------------------------------------

const insertTestimonialTypes = async () => {
    try {
        for(const item of testimonialTypes) {
            await createTestimonialType({
                name: item.name,
                link: item.link,
                image_url: item.image_url,
            })
        }
        console.log("testimonial types seeded successfully");
        
    } catch (error) {
        console.log("unable to seed previous work images", error);
    }
}

//----- TESTIMONIALS -----------------------------------------------------------------

const testimonials = [
    {
        customer:"Hayley R.",
        review:"Kaleb responded to my inquiry right away. He was able to provide a virtual quote after I sent him dimensions and images of both the wall area and tile. He was very responsive and kept me informed from initial contact through completion of the project. I’m very pleased and impressed with his work. He was very meticulous and took his time. Pricing was the best out of all bids I received. I know I’ll be using them for future projects.",
        review_type:"1",
        review_date:"2024-06-01",
    },
    {
        customer:"Judith G.",
        review:"Kaleb is probably the contractor most everyone hopes to meet, but so seldom do. He has good communication skills. He's prompt and on time. He's careful and respectful of your property. And he's VERY talented at what he does. Due to a water leak, I had to get a bathroom in my house. Very quickly discovered that I couldn't afford a general contactor. When I got to the part where I could start putting the room back together, I was dismayed at the bids I was getting for the installation of the tile shower surround. I must have gotten 5-6 bids. Kaleb responded promptly to my inquiry. His bid was thorough and detailed. He was also one of the most reasonable. Not the lowest, but within my budget. I had to wait for Kaleb (he's very busy) but wow was he worth it. The tile installation was fast but he paid attention to all the details. The shower turned out GORGEOUS! Next was the LVT floor installation. Also fast but exact. Throughout the project, Kaleb listened to what I wanted, but would offer suggestions it I asked. (He was right) I'm so happy with his work and I have recommended him to all my friends.",
        review_type:"1",
        review_date:"2024-04-01",
    },
    {
        customer:"Stuart T.",
        review:"Kaleb did an excellent job on our floor and wall of tile. It was a tough job and he did it with patience and aplomb.",
        review_type:"1",
        review_date:"2023-10-01",
    },
    {
        customer:"Hossein A.",
        review:"Excellent job very fast and efficient. Many thanks",
        review_type:"1",
        review_date:"2023-10-01",
    },
    {
        customer:"Nan K.",
        review:"Kaleb was very meticulous and professional. He did a fantastic job on installing the backsplash for our kitchen. He goes extra mile by installing our knife bar magnet after the job was done. We are pleased with the results and would definitely hire him for projects in the future. Thank you Kaleb!",
        review_type:"1",
        review_date:"2023-08-01",
    },
    {
        customer:"Tim S.",
        review:"They did a very professional job; everything was done as we asked.",
        review_type:"1",
        review_date:"2023-08-01",
    },
    {
        customer:"Alexis G.",
        review:"Kaleb & Kam are truly incredible! We have worked with many contractors on our home renovations and they are a dream team. The most important thing you need in a contractor is honesty and reliability. They are incredibly great at communication and open to feedback so if you need something a little different, they do the right thing not the easy thing. They are proud of their work. Our bathroom is beautiful, I can’t say enough good things. They show up consistently, are so easy to talk to and really truly care. I felt safe and valued when we worked with them. I hope we get to work them again in the future! On top of that, their pricing is extremely fair. You just can’t get better, they do great business with a heart.",
        review_type:"1",
        review_date:"2023-07-01",
    },
    {
        customer:"Patti P.",
        review:"Kaleb did a great job! The demoed the original tile and laid the new which was not completely flat tile which is more of a challenge. He also did some wall repair from the tile which was there before. It all turned out great! I am very happy with the job Kaleb did from start to finish. He showed up when he said he would and kept a tidy work area. I’ll hire him again for my next job.",
        review_type:"1",
        review_date:"2023-07-01",
    },
    {
        customer:"Joyce B.",
        review:"Every project done was top notch, very professional and completed in a timely manner. Couldn’t be happier. Very honest and dependable.",
        review_type:"1",
        review_date:"2023-07-01",
    },
    {
        customer:"Penny M.",
        review:"Kaleb was an absolute delight to work with! Professional, knowledgeable and personable. He was transparent about his timeframe, was very helpful with his recommendations, and importantly, stayed within my budget. I would not hesitate to use his services again, and in fact, I have recommended him to several friends.",
        review_type:"2",
        review_date:"2025-01-01",
    },
    {
        customer:"Michelle B.",
        review:"Kaleb is top-notch at tiling, but is also an incredible coordinator of all the work involved in a job. Our shower retiling hit an early snag due to Kaleb's discovery of asbestos during demo. His professionalism, excellent communication, and care for his work were apparent throughout. Because of his concern to get the job done for us with our asbestos removal causing delay, he worked us back into his tight schedule and the work was still done with utmost care. I still notice small details that show just how much effort Kaleb put into our tile work. We love our shower now! And, Kaleb will be the only tiler we'll ask to do our future projects. I can't recommend him highly enough.",
        review_type:"2",
        review_date:"2024-04-01",
    },
    {
        customer:"Aaron B.",
        review:"Kaleb has been very easy and professional to work with. He is very detail oriented and his tile work is amazing. I would recommend him to all my friends and family.",
        review_type:"2",
        review_date:"2024-07-01",
    },
    {
        customer:"Jody D.",
        review:"Kaleb was meticulous! He did an amazing job tiling our shower and communicated with us through the whole process. We feel very lucky and thankful!",
        review_type:"2",
        review_date:"2024-03-01",
    },
    {
        customer:"Staci B.",
        review:"We loved our experience! The owner Kaleb is very responsive and detail oriented. Our fireplace tile project came out so beautifully and his bid for the project was priced fairly. We will definitely be using them again!",
        review_type:"2",
        review_date:"2021-07-01",
    },
    {
        customer:"Patricia P.",
        review:"Kaleb, the owner, was great to work with and very patient with changes that had to be made due to material deliveries, etc.   He is very neat in what he leaves behind and very meticulous in his work. A really nice guy to boot. I will definitely hire him again when I have another tile project and spread the word to friends.",
        review_type:"2",
        review_date:"2022-08-01",
    },
    {
        customer:"Erik M.",
        review:"Had our shower unit removed and replaced with tile. Also had our tub surround updated with new tile. We were extremely happy with the results. Guys were very friendly and trustworthy. Highly recommended!",
        review_type:"2",
        review_date:"2023-05-01",
    },
    {
        customer:"Kris B.",
        review:"Kaleb, owner, did an amazing job! The detail and professionalism was perfect. Having him do the next project!",
        review_type:"2",
        review_date:"2022-09-01",
    },
    
]

//----- SEED TESTIMONIALS ------------------------------------------------------------

const insertTestimonials = async () => {
    try {
        for(const item of testimonials) {
            await createTestimonial({
                customer: item.customer,
                review: item.review,
                review_type: item.review_type,
                review_date: item.review_date
            })
        }
        console.log("testimonials seeded successfully");
        
    } catch (error) {
        console.log("unable to seed previous work images", error);
    }
}

//----- START SEED -------------------------------------------------------------------
const seedDatabase = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertBlogs();
        await insertBlogContent();
        await insertAdmins();
        await insertPreviousWork();
        await insertPreviousWorkImages();
        await insertTestimonialTypes();
        await insertTestimonials();
    } catch (error) {
        throw error;
    } finally {
        db.end()
    }
}

seedDatabase();