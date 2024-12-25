INSERT INTO "public"."Product" ("id", "brand", "name", "price", "rating", "image", "description", "createdAt") VALUES
(2, 'TOM FORD', 'Noir De Noir', 2550000.000000000000000000000000000000, 4.9, 'https://s.cdnsbn.com/images/products/xl/14909098005.jpg', 'The new feminine fragrance from TOM FORD, Noir De Noir is an invitation to broaden your horizons and live meaningful encounters around the world. The elegant floral scent encapsulates emotions, experiences and encounters. I AM WHAT I LIVE.', '2024-12-23 00:09:36.803'),
(3, 'CREED', 'Aventus for her', 6050000.000000000000000000000000000000, 4.8, 'https://mcgrocer.com/cdn/shop/products/creed-aventus-for-her-eau-de-parfum-30-ml_15673438_28529810_2048.jpg?v=1685638501', 'Aventus for Her is a sophisticated and empowering fragrance that embodies the spirit of the modern woman. This fruity-chypre scent opens with notes of crisp apple, sparkling bergamot, and exotic fruits. The heart unfolds with a bouquet of Bulgarian and Turkish roses, accented by Mysore sandalwood and styrax. The base is a warm and sensual blend of amber, patchouli, and peach.', '2024-12-23 01:51:15.661'),
(4, 'JO MALONE LONDON', 'Velvet Rose & Oud', 3550000.000000000000000000000000000000, 4.7, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2020/5/30/b90dea55-2fe7-4926-a345-66b3824836f3.jpg', 'Velvet Rose & Oud is a luxurious and opulent fragrance that combines the richness of rose with the smoky depth of oud. This oriental-floral scent opens with a sweet and spicy blend of clove and damask rose. The heart is a warm and woody blend of oud, praline, and sandalwood. The base is a sensual and musky blend of amber and vanilla.', '2024-12-23 01:53:40.061'),
(5, 'CREED', 'White Flowers', 9850000.000000000000000000000000000000, 4.6, 'https://www.creedperfume.com.au/cdn/shop/files/whiteflowers250_800x.png?v=1728876465', 'White Flowers is a delicate and feminine fragrance that captures the essence of a blooming garden. This floral-aldehydic scent opens with a fresh and sparkling blend of green apple and bergamot. The heart is a bouquet of white flowers, including jasmine, tuberose, and violet. The base is a soft and powdery blend of musk and amber.', '2024-12-23 01:55:58.144'),
(6, 'CREED', 'Jardin d''Amalfi', 9950000.000000000000000000000000000000, 4.5, 'https://www.creedfragrances.co.uk/cdn/shop/products/jardin-d-amalfi-75ml-bottle.jpg?v=1695297453', 'Jardin d''Amalfi is a refreshing and vibrant fragrance that evokes the sun-drenched Amalfi coast. This citrus-aromatic scent opens with a zesty blend of mandarin, bergamot, and lemon. The heart is a floral blend of neroli, pink peppercorn, and ginger. The base is a warm and woody blend of vetiver, cedarwood, and ambergris.', '2024-12-23 01:57:19.354'),
(7, 'GUERLAIN', 'Shalimar', 47546000.000000000000000000000000000000, 4.4, 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/83/MTA-103441132/guerlain_guerlain-shalimar-eau-de-parfum-spray-for-women-1-7-ounce-multi_full01.jpg', 'Shalimar is a legendary and timeless fragrance that embodies the sensuality and mystery of the Orient. This oriental-spicy scent opens with a citrusy blend of bergamot and lemon. The heart is a floral blend of jasmine, rose, and iris. The base is a warm and ambery blend of vanilla, tonka bean, and opoponax.', '2024-12-23 01:58:44.461');

INSERT INTO "public"."Gallery" ("id", "imageUrl", "productId", "createdAt") VALUES
(1, 'https://s.cdnsbn.com/images/products/14909098005-1.jpg', 2, '2024-12-23 00:09:36.803'),
(2, 'https://s.cdnsbn.com/images/products/14909098005-2.jpg', 2, '2024-12-23 00:09:36.803'),
(3, 'https://id.ozcosmetics.com/prodimgs/202103/232140.jpg', 3, '2024-12-23 01:51:15.661'),
(4, 'https://dimg.dillards.com/is/image/DillardsZoom/zoom/creed-aventus-for-her/00000001_zi_20070677.jpg', 3, '2024-12-23 01:51:15.661'),
(5, 'https://down-id.img.susercontent.com/file/a518c5cc7782974483df8f39aabed63e', 4, '2024-12-23 01:53:40.061'),
(6, 'https://amulia.com/public/img/products/velvet-rose-oud-product-info-social-media.webp', 4, '2024-12-23 01:53:40.061'),
(7, 'https://www.fragranceusa.com/cdn/shop/products/ScreenShot2021-03-30at8.02.50PM.png?v=1617149108', 5, '2024-12-23 01:55:58.144'),
(8, 'https://storage.yandexcloud.net/cdn-prod.viled.kz/v3/converted/large/150988g5KMw.webp', 5, '2024-12-23 01:55:58.144'),
(9, 'https://perfumestore.ph/wp-content/uploads/2019/10/CREED-JARDIN-DAMALFI-EDP-FOR-UNISEX-324x324.jpg', 6, '2024-12-23 01:57:19.354'),
(10, 'https://shopatshams.com.pk/cdn/shop/files/3508440752048.jpg?v=1698838921', 6, '2024-12-23 01:57:19.354'),
(11, 'https://id.ozcosmetics.com/prodimgs/202103/117000.jpg', 7, '2024-12-23 01:58:44.461'),
(12, 'https://id.ozcosmetics.com/prodimgs/202103/36137.jpg', 7, '2024-12-23 01:58:44.461');

INSERT INTO "public"."Delivery" ("id", "type", "estimatedDays", "cost") VALUES
(1, 'Standard 5-7 Business Days', 5, 0),
(2, '2-4 Business Days', 2, 25000);

INSERT INTO "public"."User" ("id", "username", "password", "createdAt") VALUES
(1, 'admin', '$2b$10$o2n5xQSMimjj8irZJoZG3OYEPCGkQ3eN1hizYNt9lyOxLr5wP.5GS', '2024-12-24 03:11:54.404');
