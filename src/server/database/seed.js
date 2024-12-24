import db from "./client.js"
import { 
    createBlogPost, 
    addBlogContent } from "./blogs.js";

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
                CONSTRAINT unique_blog_position UNIQUE (blog_id, position)
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
            `)
        console.log("Tables created successfully!");
    } catch (error) {
        console.error("Error creating tables:", error);
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
        content_type: "paragraph",
        content: "Cabinets are the centerpiece of a kitchen remodel. They make a statement visually and make up a large portion of the kitchens overall functionality. Now that the decision is made to overhaul the kitchen it may be daunting to figure out the best course of action to take with such a integral element. Let’s break down a few factors that could help take off some of that pressure.",
        position: "1"
    },
    {
        blog_id: "1",
        content_type: "subheading",
        content: "The Condition of the Existing Cabinets",
        position: "2"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "This is the first thing to look at when deciding if your cabinets just need a refresh or if they need to go. Theres a few thing you can look at to see if your cabinets are in good shape.",
        position: "3"
    },
    {
        blog_id: "1",
        content_type: "bold span",
        content: "Cabinet Boxes:",
        position: "4"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "Are the cabinet boxes still square or has water damage over the years caused them to distort from their original shape? If there is water damage, no amount of paint will make those cabinets look good. If the damage is minimal, a few repairs can be done before painting. Just keep in mind the more repairs needed the more expensive this will cost.",
        position: "5"
    },
    {
        blog_id: "1",
        content_type: "bold span",
        content: "Interior:",
        position: "6"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "Are the inside of the cabinets in good shape? This may not bug most people but wear and tear on the inside of the cabinets typically aren’t repaired when painting them.",
        position: "7"
    },
    {
        blog_id: "1",
        content_type: "bold span",
        content: "Door and Drawer Faces:",
        position: "8"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "These tend to take the most beating in the kitchen. Stuffs, scratches and nicks will all be fixed when painting. Swelling or peeling paint insinuates a deeper issue thats a lot harder to fix.",
        position: "9"
    },
    {
        blog_id: "1",
        content_type: "star point",
        content: "If your’e unhappy with the doors there’s always the option of buying new doors and drawers and just painting the cabinet boxes. This option will be discussed later in this article.",
        position: "10"
    },
    {
        blog_id: "1",
        content_type: "bold span",
        content: "Cabinet Materials:",
        position: "11"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "It may come as little surprise that some materials are more durable than others. OSB, which most cost efficient cabinets are made of now tends to swell with moisture and steam. Plywood also tends to do this but not quite as bad. Hardwoods are the most durable material for cabinets depending on which type of wood your cabinet is made out of. Plywood and Hardwood cabinets are worth painting where as OSB cabinets will typically need to be replaced completely. ",
        position: "12"
    },
    {
        blog_id: "1",
        content_type: "subheading",
        content: "Time",
        position: "13"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "When Planning a remodel time tends to be a huge factor. When you’re kitchen is down day to day life becomes a lot harder so you want the project to go as fast as possible.",
        position: "14"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "Painting tends to take the longest out of all these options, it is also the most intrusive. Staging will need to be set up to paint the doors meaning for the duration of the project your living room or dining room will also not be accessible. Paint fumes, especially during the priming stage is also a factor to consider.",
        position: "15"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "Installing cabinets on the other hand goes quite a bit faster and is less intrusive. The cabinets will come pre-finished so there will be no painting necessary.",
        position: "16"
    },
    {
        blog_id: "1",
        content_type: "subheading",
        content: "Design and Layout",
        position: "17"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "Ultimately if you’re not happy with how the cabinets look or how your kitchen is laid out it may be a good idea just to buy new cabinets.",
        position: "18"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "If it’s just the door and drawer face style that you’re unhappy with, a cheaper option would be to keep the cabinet boxes and just replace those components. This will also give you the option of upgrading to soft-close hinges and door slides.",
        position: "19"
    },
    {
        blog_id: "1",
        content_type: "subheading",
        content: "Cost",
        position: "20"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "This is such a huge factor when remodeling. With the cost of living on the rise, most homeowners want to get the best upgrade for the most cost-efficient price. Each one of these options tends to vary in price significantly. ",
        position: "21"
    },
    {
        blog_id: "1",
        content_type: "bold span",
        content: "Painting:",
        position: "22"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "This tends to be the cheapest option. The price is made up mostly with the cost of labor.",
        position: "23"
    },
    {
        blog_id: "1",
        content_type: "bold span",
        content: "New door and drawer faces:",
        position: "24"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "This still involves painting the cabinets and door and drawer faces but it allows you to upgrade the look of your cabinets. This will be slightly more expensive than painting alone. ",
        position: "25"
    },
    {
        blog_id: "1",
        content_type: "New Cabinets",
        content: "Door and Drawer Faces:",
        position: "26"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "This is the most expensive option. The price will also vary the most depending on the type of cabinets you would like to have as well as the material they’re made of. The cheapest cabinet option will be a OSB and Plywood hybrid, where the most expensive will be you’re hardwoods.",
        position: "27"
    },
    {
        blog_id: "1",
        content_type: "image",
        content: "/blog/blog-image-painting-cabinets-2.jpg",
        position: "28"
    },
    {
        blog_id: "1",
        content_type: "subheading",
        content: "Wrap-Up",
        position: "29"
    },
    {
        blog_id: "1",
        content_type: "paragraph",
        content: "There is a lot to consider when planning a kitchen remodel and this is just one of the many facets to weigh. Each situation is different so talking to a licensed contractor will ultimately be the best way to help you get going in a good direction. Click here to schedule a free in-person consultation.",
        position: "30"
    },
    {
        blog_id: "2",
        content_type: "paragraph",
        content: "There are countless different options when it comes to tile. Often times what gets neglected when picking out tile is the type of edging you’ll use. What is edging?",
        position: "1"
    },
    {
        blog_id: "2",
        content_type: "paragraph",
        content: "Typical installs will leave the a side of the tile exposed leaving a strip of color that you may not want in your new perfectly curated space. Something needs to be done here to make that aesthetically pleasing. Consider these options. ",
        position: "2"
    },
    {
        blog_id: "2",
        content_type: "subheading",
        content: "“Schluter” Edge  (Edge Trim)",
        position: "3"
    },
    {
        blog_id: "2",
        content_type: "paragraph",
        content: "This is a trim piece thats made of stainless steel, coated aluminum or PVC. Several companies make their own versions of this trim and it comes in all different shapes, colors, sizes and options to coordinate with any tile. ",
        position: "4"
    },
    {
        blog_id: "2",
        content_type: "paragraph",
        content: "This method provides the ultimate protection for the edge, is cost efficient and takes minimal effort to install.",
        position: "5"
    },
    {
        blog_id: "2",
        content_type: "image",
        content: "/blog/blog-image-tile-trims-1.jpg",
        position: "6"
    },
    {
        blog_id: "2",
        content_type: "subheading",
        content: "Bullnose",
        position: "7"
    },
    {
        blog_id: "2",
        content_type: "paragraph",
        content: "Many tile models will come with bullnose pieces to match. These will have the same color and sheen of the field tile with the exception of having one side rounded over and sometimes a different length or width. This works well with subway tile installs and offers a more softened, classic look. Not all tile manufacturers offer this option so make sure its available before ordering your field tile. ",
        position: "8"
    },
    {
        blog_id: "2",
        content_type: "image",
        content: "/blog/blog-image-tile-trims-2.jpg",
        position: "9"
    },
    {
        blog_id: "2",
        content_type: "subheading",
        content: "Pencil Tile",
        position: "10"
    },
    {
        blog_id: "2",
        content_type: "paragraph",
        content: "These are thin strips of tile that are adhered to the edge of your install. They’re typically about 6” long and about 3/4” wide and are a good option if you want to keep the soft, round look and make the edges stand out. These pieces tend to be very brittle and quite expensive. Make sure your order plenty.",
        position: "11"
    },
    {
        blog_id: "2",
        content_type: "image",
        content: "/blog/blog-image-tile-trims-3.jpg",
        position: "12"
    },
    {
        blog_id: "2",
        content_type: "subheading",
        content: "Mitered Edge",
        position: "13"
    },
    {
        blog_id: "2",
        content_type: "paragraph",
        content: "This method eliminates the need for trim pieces and extra tile. Rather the both pieces of tile are cut back 45 degrees to give the corner a sharp clean look. This is definitely the cleanest look over them all but is also one of the most brittle. If you’re going to go this route make sure that its an area that doesn’t receive much abuse",
        position: "14"
    },
    {
        blog_id: "2",
        content_type: "image",
        content: "/blog/blog-image-tile-trims-4.jpg",
        position: "15"
    },
    {
        blog_id: "2",
        content_type: "subheading",
        content: "Polished Edge",
        position: "16"
    },
    {
        blog_id: "2",
        content_type: "paragraph",
        content: "This is the simplest and most cost effective approach since it requires no fancy cuts or trim pieces. Usually all thats done is a quick bevel one the front edge of the tile to remove the sharpness. This is okay for natural stone as well as some porcelain. Before settling on this route, make sure you’re happy with the side color of the tile since this will show. Typically a good rule of thumb is if the side is a relatively close match to the face the edge won’t stand out.",
        position: "17"
    },
    {
        blog_id: "2",
        content_type: "image",
        content: "/blog/blog-image-tile-trims-5.jpg",
        position: "18"
    },
    {
        blog_id: "2",
        content_type: "subheading",
        content: "Summary",
        position: "19"
    },
    {
        blog_id: "2",
        content_type: "paragraph",
        content: "The versatility of tile is unmatched which can be exciting and intimidating. If you’re still not sure which edging will work best for the tile you’d like to install don’t hesitate to reach out to us. Click here for a free home consultation or video call.",
        position: "20"
    },
    {
        blog_id: "3",
        content_type: "paragraph",
        content: "For some people value is everything. If that’s you, than its really important to know wether the money you pay for your kitchen remodel will translate to an increase in your homes value. The short answer is that it will. Theres some factors, though, that dictate how high of a percentage you’ll recoup. ",
        position: "1"
    },
    {
        blog_id: "3",
        content_type: "subheading",
        content: "Quality of Craftsmanship",
        position: "2"
    },
    {
        blog_id: "3",
        content_type: "paragraph",
        content: "This speaks for itself. A poorly done project that looks bad will always have lower value. Make sure you don’t go the cheapest route when looking for a contractor. That being said even the pros who charge a premium could cut corners. Make sure you hire someone you can trust.",
        position: "3"
    },
    {
        blog_id: "3",
        content_type: "paragraph",
        content: "If you do the work yourself don’t rely on you’re own knowledge. Check industry standards and inform yourself about materials and processes",
        position: "4"
    },
    {
        blog_id: "3",
        content_type: "subheading",
        content: "Know the Numbers",
        position: "5"
    },
    {
        blog_id: "3",
        content_type: "paragraph",
        content: "The more you spend on a remodel the smaller your ROI (return on investment) becomes. Many say that a kitchen remodel should cost between 5% and 15% of your home.",
        position: "6"
    },
    {
        blog_id: "3",
        content_type: "paragraph",
        content: "A light kitchen remodel has the possibility of recouping all its value. Once you start changing cabinets, layout, and adding fancy appliances you’ll start to see the ROI fall to 60% then 50% and even down to 40% if you start creeping into spending a fifth of your homes value on that remodel. ",
        position: "7"
    },
    {
        blog_id: "3",
        content_type: "subheading",
        content: "Finishes",
        position: "8"
    },
    {
        blog_id: "3",
        content_type: "paragraph",
        content: "Installing cheap materials and very hip designs will date your kitchen fast. Make sure to pick finishes, colors and patterns that work with your own taste but also could possible appeal to someone else’s as well. This is where friends and family come in. Get their honest opinion before you settle. ",
        position: "9"
    },
    {
        blog_id: "3",
        content_type: "subheading",
        content: "Summary",
        position: "10"
    },
    {
        blog_id: "3",
        content_type: "paragraph",
        content: "While thinking about ROI is important, it isn’t everything. Ultimately this will be the space you spend a large portion of your life and will be a space that draws in your family and friends. ",
        position: "11"
    },
    {
        blog_id: "3",
        content_type: "paragraph",
        content: "If you would like help to plan your remodel click here for a free consultation at your home or on a video call.",
        position: "12"
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
                position: item.position
            })
        }
        console.log("blog content seeded successfully");
    } catch (error) {
        console.log("unable to seed blog content", error);
        
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
    } catch (error) {
        throw error;
    } finally {
        db.end()
    }
}

seedDatabase();