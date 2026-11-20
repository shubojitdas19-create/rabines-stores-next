/* eslint-disable @typescript-eslint/no-require-imports */
const crypto = require("crypto");
const mysql = require("d:/Projects/saas-commerce/packages/db/node_modules/mysql2/promise");
const bcrypt = require("d:/Projects/saas-commerce/apps/admin/node_modules/bcryptjs");

const DB_URL = "mysql://cfacijgr_admin:Jstar%40890@66.116.227.244:3306/cfacijgr_saas";

async function seed() {
  console.log("Connecting to database...");
  const conn = await mysql.createConnection(DB_URL);

  try {
    // 1. Check if rabines-stores already exists
    const [existing] = await conn.execute("SELECT * FROM stores WHERE slug = ?", ["rabines-stores"]);
    if (existing.length > 0) {
      console.log("Store 'rabines-stores' already exists with ID:", existing[0].id);
      return existing[0];
    }

    const storeId = crypto.randomUUID();
    const userId = crypto.randomUUID();
    const subscriptionId = crypto.randomUUID();
    const settingsId = crypto.randomUUID();
    const apiKey = `sk_live_${crypto.randomBytes(16).toString("hex")}`;

    console.log("Creating store 'Rabines Stores'...");
    await conn.execute(
      `INSERT INTO stores (id, name, slug, currency, api_key, is_quote_based, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [storeId, "Rabines Stores", "rabines-stores", "INR", apiKey, false]
    );

    // Create Tenant Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Admin@123", salt);

    console.log("Creating tenant admin user (admin@rabinesstores.com / Admin@123)...");
    await conn.execute(
      `INSERT INTO users (id, store_id, name, email, password_hash, role, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [userId, storeId, "Rabines Admin", "admin@rabinesstores.com", hashedPassword, "tenant_admin"]
    );

    // Create Subscription
    console.log("Creating subscription...");
    await conn.execute(
      `INSERT INTO subscriptions (id, store_id, plan, billing_cycle, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [subscriptionId, storeId, "Enterprise", "Monthly", "Active"]
    );

    // Create Store Settings
    console.log("Creating store settings...");
    await conn.execute(
      `INSERT INTO store_settings (id, store_id, theme_color, tax_rate, flat_shipping_rate, is_cod_enabled, payment_provider, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [settingsId, storeId, "#ef6b32", "18.00", "150.00", true, "none"]
    );

    // Create Categories
    const categoriesData = [
      { id: crypto.randomUUID(), name: "Turning Tools", slug: "turning-tools" },
      { id: crypto.randomUUID(), name: "Milling Tools", slug: "milling-tools" },
      { id: crypto.randomUUID(), name: "Drilling Tools", slug: "drilling-tools" },
      { id: crypto.randomUUID(), name: "CNC Tool Holders", slug: "cnc-tool-holders" },
      { id: crypto.randomUUID(), name: "Cutting Inserts", slug: "cutting-inserts" },
      { id: crypto.randomUUID(), name: "Lathe Jaws", slug: "lathe-jaws" },
      { id: crypto.randomUUID(), name: "Machine Accessories", slug: "machine-accessories" },
    ];

    console.log("Inserting categories...");
    for (const cat of categoriesData) {
      await conn.execute(
        `INSERT INTO categories (id, store_id, name, slug, created_at) VALUES (?, ?, ?, ?, NOW())`,
        [cat.id, storeId, cat.name, cat.slug]
      );
    }

    const catMap = Object.fromEntries(categoriesData.map(c => [c.slug, c.id]));

    // Products Data
    const productsData = [
      {
        id: crypto.randomUUID(),
        name: "CNMG 120404 Carbide Insert",
        slug: "cnmg-120404",
        brand: "Rabines Precision",
        categoryId: catMap["cutting-inserts"],
        description: "High-precision indexable CNMG 120404 carbide turning inserts engineered for steel and cast iron machining. Premium TiCN/Al2O3 multi-layer coating ensures exceptional edge wear resistance and long tool life.",
        basePrice: "1450.00",
        discountPrice: "1350.00",
        isFeatured: true,
        sku: "RBS-CI-CNMG-120404",
        image: "/images/categories/shop-cnc-turning-inserts.png",
        specs: [
          { label: "Insert geometry", value: "CNMG 12 04 04" },
          { label: "Grade", value: "Carbide · P25 / P35" },
          { label: "Coating", value: "TiCN / Al2O3" },
          { label: "Pack size", value: "10 inserts" },
          { label: "Material", value: "Tungsten Carbide" },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "CNMG 120408 Carbide Insert",
        slug: "cnmg-120408",
        brand: "Rabines Precision",
        categoryId: catMap["cutting-inserts"],
        description: "Heavy-duty CNMG 120408 indexable carbide insert with 0.8mm nose radius for medium to rough turning passes with high chip control stability.",
        basePrice: "1580.00",
        discountPrice: "1480.00",
        isFeatured: true,
        sku: "RBS-CI-CNMG-120408",
        image: "/images/categories/shop-cnc-turning-inserts.png",
        specs: [
          { label: "Insert geometry", value: "CNMG 12 04 08" },
          { label: "Grade", value: "Carbide · P25 / P35" },
          { label: "Application", value: "General-purpose turning" },
          { label: "Pack size", value: "10 inserts" },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "MCLNR 2020K12 Turning Tool Holder",
        slug: "mclnr-2020k12",
        brand: "Rabines Precision",
        categoryId: catMap["cnc-tool-holders"],
        description: "Rigid square shank external turning tool holder for CNMG inserts. Features high clamping force top-clamp mechanism for heavy depths of cut.",
        basePrice: "2890.00",
        discountPrice: "2650.00",
        isFeatured: true,
        sku: "RBS-TH-MCLNR-2020K12",
        image: "/images/categories/shop-cnc-turning-holder.png",
        specs: [
          { label: "Shank size", value: "20 × 20 mm" },
          { label: "Insert family", value: "CNMG 1204" },
          { label: "Clamping", value: "Top clamp" },
          { label: "Application", value: "External turning" },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "WNMG 080408 Carbide Insert",
        slug: "wnmg-080408",
        brand: "Rabines Precision",
        categoryId: catMap["cutting-inserts"],
        description: "Trigon double-sided WNMG 080408 turning insert with 6 cutting edges for superior economy and precision facing operations.",
        basePrice: "1720.00",
        discountPrice: "1620.00",
        isFeatured: false,
        sku: "RBS-CI-WNMG-080408",
        image: "/images/categories/shop-cnc-turning-inserts.png",
        specs: [
          { label: "Insert geometry", value: "WNMG 08 04 08" },
          { label: "Grade", value: "Carbide · M20 / P25" },
          { label: "Application", value: "Finishing and medium turning" },
          { label: "Pack size", value: "10 inserts" },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "APKT 1604 Milling Insert",
        slug: "apkt-1604",
        brand: "Rabines Precision",
        categoryId: catMap["milling-tools"],
        description: "Positive rake APKT 1604 indexable shoulder milling insert providing smooth low-resistance cutting, clean 90-degree step walls, and excellent surface finish.",
        basePrice: "1920.00",
        discountPrice: "1790.00",
        isFeatured: true,
        sku: "RBS-MI-APKT-1604",
        image: "/images/categories/shop-cnc-milling-inserts.png",
        specs: [
          { label: "Insert geometry", value: "APKT 16 04" },
          { label: "Grade", value: "Carbide · P30" },
          { label: "Cutting style", value: "Positive rake" },
          { label: "Pack size", value: "10 inserts" },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "4-Flute Solid Carbide End Mill · 10 mm",
        slug: "endmill-10mm",
        brand: "Rabines Precision",
        categoryId: catMap["milling-tools"],
        description: "Micro-grain solid carbide 4-flute end mill with AlTiN coating for high-speed side milling, profiling, and slotting up to HRC 55 steels.",
        basePrice: "2950.00",
        discountPrice: "2700.00",
        isFeatured: true,
        sku: "RBS-ME-4F-10",
        image: "/images/categories/shop-cnc-carbide-endmill.png",
        specs: [
          { label: "Cutting diameter", value: "10 mm" },
          { label: "Flutes", value: "4" },
          { label: "Material", value: "Solid carbide" },
          { label: "Application", value: "Milling and profiling" },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "ER32 Collet Chuck Set",
        slug: "er32-collet-set",
        brand: "Rabines Precision",
        categoryId: catMap["machine-accessories"],
        description: "BT40 ER32 precision collet chuck holder kit complete with spanner wrench and collets. Balanced for smooth CNC spindle performance up to 12,000 RPM.",
        basePrice: "5470.00",
        discountPrice: "4990.00",
        isFeatured: true,
        sku: "RBS-CH-ER32-SET",
        image: "/images/categories/shop-cnc-collet-chuck.png",
        specs: [
          { label: "System", value: "ER32" },
          { label: "Holder interface", value: "BT40" },
          { label: "Included", value: "Chuck, collets, nut & wrench" },
          { label: "Application", value: "Milling and drilling" },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "HSS Twist Drill · 10 mm",
        slug: "hss-drill-10mm",
        brand: "Rabines Precision",
        categoryId: catMap["drilling-tools"],
        description: "Industrial high-speed steel twist drill with 118-degree point angle for drilling general mild steels, alloys, and non-ferrous metals.",
        basePrice: "590.00",
        discountPrice: "520.00",
        isFeatured: false,
        sku: "RBS-DR-HSS-10",
        image: "/images/categories/shop-hss-drills.png",
        specs: [
          { label: "Diameter", value: "10 mm" },
          { label: "Material", value: "High-speed steel (HSS)" },
          { label: "Point angle", value: "118°" },
          { label: "Application", value: "General-purpose drilling" },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "HSS Center Drill · 3 mm",
        slug: "hss-center-drill-3mm",
        brand: "Rabines Precision",
        categoryId: catMap["drilling-tools"],
        description: "Double-ended 60-degree high-speed steel combined drill and countersink for precision center hole locating on lathe chuck turning setups.",
        basePrice: "360.00",
        discountPrice: "320.00",
        isFeatured: false,
        sku: "RBS-DR-HSS-CD3",
        image: "/images/categories/shop-hss-drills.png",
        specs: [
          { label: "Diameter", value: "3 mm" },
          { label: "Material", value: "High-speed steel (HSS)" },
          { label: "Form", value: "Combined drill and countersink" },
          { label: "Application", value: "Centering and starting holes" },
        ],
      },
    ];

    console.log("Inserting products, media, and variants...");
    for (const prod of productsData) {
      await conn.execute(
        `INSERT INTO products (id, store_id, category_id, brand, name, slug, description, base_price, discount_price, is_featured, is_archived, specifications, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          prod.id,
          storeId,
          prod.categoryId,
          prod.brand,
          prod.name,
          prod.slug,
          prod.description,
          prod.basePrice,
          prod.discountPrice,
          prod.isFeatured,
          false,
          JSON.stringify(prod.specs),
        ]
      );

      // Product Media
      const mediaId = crypto.randomUUID();
      await conn.execute(
        `INSERT INTO product_media (id, product_id, url, media_type, sort_order)
         VALUES (?, ?, ?, ?, ?)`,
        [mediaId, prod.id, prod.image, "image", 0]
      );

      // Product Variant
      const variantId = crypto.randomUUID();
      await conn.execute(
        `INSERT INTO product_variants (id, product_id, title, sku, price_override, stock_quantity, image_id)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [variantId, prod.id, "Standard", prod.sku, null, 50, mediaId]
      );
    }

    // Insert sample reviews for Rabines Stores
    const reviewsData = [
      {
        id: crypto.randomUUID(),
        customerName: "Subhasis Mondal",
        email: "subhasis.toolroom@gmail.com",
        phone: "+91 98310 11223",
        location: "Baltikuri Industrial Area, Howrah",
        rating: 5,
        text: "The CNMG 120408 inserts we ordered for our lathe shop lasted nearly 30% longer on EN8 steel than the previous brand. Consistent tool quality and on-time delivery across Howrah.",
        adminReply: "Thank you Subhasis! Glad the carbide grade delivered superior tool life for your machining runs.",
        isVerified: true,
      },
      {
        id: crypto.randomUUID(),
        customerName: "Rajesh Sharma",
        email: "rajesh.precision@outlook.com",
        phone: "+91 94330 55441",
        location: "Kolkata Leather Complex, Bantala",
        rating: 5,
        text: "Ordered ER32 collet sets and turning tool holders. Runout is well within 0.005mm and clamping rigidity is solid. Outstanding technical guidance from the Rabines team.",
        adminReply: "Appreciate the feedback, Rajesh. Looking forward to supporting your upcoming tooling batches.",
        isVerified: true,
      },
    ];

    console.log("Inserting reviews...");
    for (const rev of reviewsData) {
      await conn.execute(
        `INSERT INTO reviews (id, store_id, customer_name, email, phone, location, rating, text, admin_reply, is_visible, is_verified, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          rev.id,
          storeId,
          rev.customerName,
          rev.email,
          rev.phone,
          rev.location,
          rev.rating,
          rev.text,
          rev.adminReply,
          true,
          rev.isVerified,
        ]
      );
    }

    console.log("\n=======================================================");
    console.log("SUCCESSFULLY DEPLOYED 'Rabines Stores' TENANT!");
    console.log("Store ID:       ", storeId);
    console.log("Store Slug:     ", "rabines-stores");
    console.log("Admin Email:    ", "admin@rabinesstores.com");
    console.log("Admin Password: ", "Admin@123");
    console.log("Tenant Portal:  ", "http://localhost:3000/rabines-stores/dashboard");
    console.log("=======================================================\n");

    return { id: storeId };
  } finally {
    await conn.end();
  }
}

seed().catch(console.error);
