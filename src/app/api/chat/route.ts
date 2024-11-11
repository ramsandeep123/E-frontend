import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";

export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are customer support assistant at e-commerace store which's name is UrbanNest , you have to  answere customer query related and our store related  dont give reply to outside store inquicry question your data for store is and pricing is in dollar and shop contact details 394810-Surat,Gujarat
ramsandip90900@gmail.com
+91 7990808249
+91 7990808249

title
"e.l.f. Bite-Size Eyeshadow Palette"
price
3
description
"Compact eyeshadow palette with four versatile shades for any look."
category
"cosmetics"
image
"https://images.ulta.com/is/image/Ulta/2565725"

rating
Object
createdAt
2024-11-10T07:52:32.223+00:00
updatedAt
2024-11-10T07:52:32.223+00:00
__v
0





_id
6730665143e63d28749b7572
title
"Revlon ColorStay Liquid Eyeliner"
price
7.5
description
"Waterproof liquid eyeliner with all-day wear and intense color."
category
"cosmetics"
image
"https://images.ulta.com/is/image/Ulta/2529311"

rating
Object
createdAt
2024-11-10T07:52:49.157+00:00
updatedAt
2024-11-10T07:52:49.157+00:00
__v
0
_id
6730666143e63d28749b7574
title
"NYX Professional Makeup Butter Gloss"
price
5
description
"Non-sticky, buttery lip gloss in a wide variety of delicious shades."
category
"cosmetics"
image
"https://images.ulta.com/is/image/Ulta/2545734"

rating
Object
createdAt
2024-11-10T07:53:05.747+00:00
updatedAt
2024-11-10T07:53:05.747+00:00
__v
0
_id
6730667843e63d28749b7576
title
"Clinique High Impact Mascara"
price
19.5
description
"Volumizing and lengthening mascara for a bold, high-impact look."
category
"cosmetics"
image
"https://images.ulta.com/is/image/Ulta/2531375"

rating
Object
createdAt
2024-11-10T07:53:28.341+00:00
updatedAt
2024-11-10T07:53:28.341+00:00
__v
0
_id
6730668a43e63d28749b7578
title
"The Ordinary Hyaluronic Acid 2% + B5"
price
6.8
description
"Hydrating serum with hyaluronic acid and vitamin B5 for smooth, plump …"
category
"cosmetics"
image
"https://images.ulta.com/is/image/Ulta/2530244"

rating
Object
createdAt
2024-11-10T07:53:46.771+00:00
updatedAt
2024-11-10T07:53:46.771+00:00
__v
0
_id
6730669743e63d28749b757a
title
"Olay Regenerist Micro-Sculpting Cream"
price
24.99
description
"Anti-aging face moisturizer with advanced formula for firm, smooth ski…"
category
"cosmetics"
image
"https://images.ulta.com/is/image/Ulta/2219434"

rating
Object
createdAt
2024-11-10T07:53:59.950+00:00
updatedAt
2024-11-10T07:53:59.950+00:00
__v
0
_id
673066b743e63d28749b757c
title
"Sephora Collection Lip Stain"
price
12
description
"Long-wearing, lightweight lip stain with a satin finish."
category
"cosmetics"
image
"https://images.ulta.com/is/image/Ulta/2550641"

rating
Object
createdAt
2024-11-10T07:54:31.382+00:00
updatedAt
2024-11-10T07:54:31.382+00:00
__v
0
title
"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
price
109.95
description
"Your perfect pack for everyday use and walks in the forest. Stash your…"
category
"men's clothing"
image
"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"

rating
Object
createdAt
2024-11-09T19:44:45.395+00:00
updatedAt
2024-11-09T19:44:45.395+00:00
__v
0
_id
672fbbe0bfa090011644b70a
title
"Mens Casual Premium Slim Fit T-Shirts"
price
22.3
description
"Slim-fitting style, contrast raglan long sleeve, three-button henley p…"
category
"men's clothing"
image
"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jp…"

rating
Object
createdAt
2024-11-09T19:45:36.323+00:00
updatedAt
2024-11-09T19:45:36.323+00:00
__v
0
_id
672fbbf6bfa090011644b70c
title
"Mens Cotton Jacket"
price
55.99
description
"great outerwear jackets for Spring/Autumn/Winter, suitable for many oc…"
category
"men's clothing"
image
"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"

rating
Object
createdAt
2024-11-09T19:45:58.075+00:00
updatedAt
2024-11-09T19:45:58.075+00:00
__v
0
_id
672fbc0dbfa090011644b70e
title
"Mens Casual Slim Fit"
price
15.99
description
"The color could be slightly different between on the screen and in pra…"
category
"men's clothing"
image
"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"

rating
Object
createdAt
2024-11-09T19:46:21.556+00:00
updatedAt
2024-11-09T19:46:21.556+00:00
__v
0
_id
672fbc28bfa090011644b710
title
"John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bra…"
price
695
description
"From our Legends Collection, the Naga was inspired by the mythical wat…"
category
"jewelery"
image
"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"

rating
Object
createdAt
2024-11-09T19:46:48.332+00:00
updatedAt
2024-11-09T19:46:48.332+00:00
__v
0
_id
672fbc44bfa090011644b712
title
"Solid Gold Petite Micropave"
price
168
description
"Satisfaction Guaranteed. Return or exchange any order within 30 days.D…"
category
"jewelery"
image
"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"

rating
Object
createdAt
2024-11-09T19:47:16.167+00:00
updatedAt
2024-11-09T19:47:16.167+00:00
__v
0
_id
672fbc5abfa090011644b714
title
"White Gold Plated Princess"
price
9.99
description
"Classic Created Wedding Engagement Solitaire Diamond Promise Ring for …"
category
"jewelery"
image
"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"

rating
Object
createdAt
2024-11-09T19:47:38.942+00:00
updatedAt
2024-11-09T19:47:38.942+00:00
__v
0
_id
672fbc7bbfa090011644b716
title
"Pierced Owl Rose Gold Plated Stainless Steel Double"
price
10.99
description
"Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stai…"
category
"jewelery"
image
"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"

rating
Object
createdAt
2024-11-09T19:48:11.739+00:00
updatedAt
2024-11-09T19:48:11.739+00:00
__v
0
_id
672fbc92bfa090011644b718
title
"WD 2TB Elements Portable External Hard Drive - USB 3.0"
price
64
description
"USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Perfo…"
category
"electronics"
image
"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"

rating
Object
createdAt
2024-11-09T19:48:34.455+00:00
updatedAt
2024-11-09T19:48:34.455+00:00
__v
0
_id
672fbca8bfa090011644b71a
title
"SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s"
price
109
description
"Easy upgrade for faster boot up, shutdown, application load and respon…"
category
"electronics"
image
"https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"

rating
Object
createdAt
2024-11-09T19:48:56.781+00:00
updatedAt
2024-11-09T19:48:56.781+00:00
__v
0
_id
672fbcbcbfa090011644b71c
title
"Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA I…"
price
109
description
"3D NAND flash are applied to deliver high transfer speeds Remarkable t…"
category
"electronics"
image
"https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg"

rating
Object
createdAt
2024-11-09T19:49:16.236+00:00
updatedAt
2024-11-09T19:49:16.236+00:00
__v
0
_id
672fbcd8bfa090011644b71e
title
"WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Dr…"
price
114
description
"Expand your PS4 gaming experience, Play anywhere Fast and easy, setup …"
category
"electronics"
image
"https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg"

rating
Object
createdAt
2024-11-09T19:49:44.680+00:00
updatedAt
2024-11-09T19:49:44.680+00:00
__v
0
_id
672fbd14bfa090011644b720
title
"Acer Tv"
price
599
description
"21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon f…"
category
"electronics"
image
"https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"

rating
Object
createdAt
2024-11-09T19:50:44.510+00:00
updatedAt
2024-11-09T19:50:44.510+00:00
__v
0
_id
672fbd3cbfa090011644b722
title
"Samsung 49-Inch Tv"
price
999.99
description
"49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch s…"
category
"electronics"
image
"https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"

rating
Object
createdAt
2024-11-09T19:51:24.395+00:00
updatedAt
2024-11-09T19:51:24.395+00:00
__v
0
_id
672fbd85bfa090011644b724
title
"Women's Winter Coats"
price
56.99
description
"Note:The Jackets is US standard size, Please choose size as your usual…"
category
"women's clothing"
image
"https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"

rating
Object
createdAt
2024-11-09T19:52:37.309+00:00
updatedAt
2024-11-09T19:52:37.309+00:00
__v
0
_id
672fbdb8bfa090011644b726
title
"Women's Biker Jacket"
price
29.95
description
"100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTT…"
category
"women's clothing"
image
"https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"

rating
Object
createdAt
2024-11-09T19:53:28.406+00:00
updatedAt
2024-11-09T19:53:28.406+00:00
__v
0
_id
672fbe1dbfa090011644b728
title
"Womens T Shirt Casual Cotton Short"
price
12.99
description
"95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Ne…"
category
"women's clothing"
image
"https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"

rating
Object
createdAt
2024-11-09T19:55:09.146+00:00
updatedAt
2024-11-09T19:55:09.146+00:00
__v
0
_id
673065e943e63d28749b756a
title
"Maybelline Fit Me Foundation"
price
8.99
description
"Matte and poreless foundation that fits all skin tones and controls sh…"
category
"cosmetics"
image
"https://images.ulta.com/is/image/Ulta/2535274"

rating
Object
createdAt
2024-11-10T07:51:07.901+00:00
updatedAt
2024-11-10T07:51:07.901+00:00
__v
0
_id
6730661e43e63d28749b756c
title
"L'Oréal Paris Infallible Pro-Matte Liquid Lipstick"
price
10.95
description
"Long-lasting, high-impact color with a lightweight, comfortable feel."
category
"cosmetics"
image
"https://images.ulta.com/is/image/Ulta/2525466"

rating
Object
createdAt
2024-11-10T07:51:58.268+00:00
updatedAt
2024-11-10T07:51:58.268+00:00
__v
0
_id
6730662e43e63d28749b756e
title
"Neutrogena Hydro Boost Water Gel"
price
12.99
description
"Hydrating face moisturizer for all skin types, infused with hyaluronic…"
category
"cosmetics"
image
"https://images.ulta.com/is/image/Ulta/2299999"

rating
Object
createdAt
2024-11-10T07:52:14.260+00:00
updatedAt
2024-11-10T07:52:14.260+00:00
.

Current conversation:
{chat_history}

User: {input}
AI:`;

/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const messages = body.messages ?? [];
        const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
        const currentMessageContent = messages[messages.length - 1].content;
        const prompt = PromptTemplate.fromTemplate(TEMPLATE);

        /**
         * You can also try e.g.:
         *
         * import { ChatAnthropic } from "@langchain/anthropic";
         * const model = new ChatAnthropic({});
         *
         * See a full list of supported models at:
         * https://js.langchain.com/docs/modules/model_io/models/
         */
        const model = new ChatOpenAI({
            temperature: 0.8,
            model: "gpt-4o-mini",


        });

        /**
         * Chat models stream message chunks rather than bytes, so this
         * output parser handles serialization and byte-encoding.
         */
        const outputParser = new HttpResponseOutputParser();

        /**
         * Can also initialize as:
         *
         * import { RunnableSequence } from "@langchain/core/runnables";
         * const chain = RunnableSequence.from([prompt, model, outputParser]);
         */
        const chain = prompt.pipe(model).pipe(outputParser);

        const stream = await chain.stream({
            chat_history: formattedPreviousMessages.join("\n"),
            input: currentMessageContent,
        });

        return new StreamingTextResponse(stream);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
    }
}