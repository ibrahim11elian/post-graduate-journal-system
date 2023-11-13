PGDMP                     	    {            post_db    15.4    15.4 P    \           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ]           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ^           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            _           1262    16494    post_db    DATABASE     �   CREATE DATABASE post_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1256';
    DROP DATABASE post_db;
                postgres    false                        3079    33045    unaccent 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;
    DROP EXTENSION unaccent;
                   false            `           0    0    EXTENSION unaccent    COMMENT     P   COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';
                        false    2            �            1255    33052    remove_spaces(text)    FUNCTION     �   CREATE FUNCTION public.remove_spaces(str text) RETURNS text
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN REPLACE(str, ' ', '');
END;
$$;
 .   DROP FUNCTION public.remove_spaces(str text);
       public          postgres    false            �            1259    32998    examination    TABLE     "  CREATE TABLE public.examination (
    id integer NOT NULL,
    outgoing_letter character varying(50),
    outgoing_date character varying(100),
    incoming_letter character varying(50),
    incoming_date character varying(100),
    result character varying(50),
    research_id integer
);
    DROP TABLE public.examination;
       public         heap    postgres    false            �            1259    32997    examination_id_seq    SEQUENCE     �   CREATE SEQUENCE public.examination_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.examination_id_seq;
       public          postgres    false    224            a           0    0    examination_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.examination_id_seq OWNED BY public.examination.id;
          public          postgres    false    223            �            1259    33029    examn_details    TABLE     4  CREATE TABLE public.examn_details (
    id integer NOT NULL,
    judge_letter character varying(50),
    letter_date character varying(100),
    edit_letter character varying(50),
    edit_date character varying(100),
    result character varying(50),
    judge_id integer,
    sci_examination_id integer
);
 !   DROP TABLE public.examn_details;
       public         heap    postgres    false            �            1259    33028    examn_details_id_seq    SEQUENCE     �   CREATE SEQUENCE public.examn_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.examn_details_id_seq;
       public          postgres    false    230            b           0    0    examn_details_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.examn_details_id_seq OWNED BY public.examn_details.id;
          public          postgres    false    229            �            1259    32986    journal    TABLE     �   CREATE TABLE public.journal (
    id integer NOT NULL,
    journal_edition integer NOT NULL,
    edition_date character varying(100) NOT NULL,
    research_id integer
);
    DROP TABLE public.journal;
       public         heap    postgres    false            �            1259    32985    journal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.journal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.journal_id_seq;
       public          postgres    false    222            c           0    0    journal_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.journal_id_seq OWNED BY public.journal.id;
          public          postgres    false    221            �            1259    33056 
   judge_info    TABLE     �   CREATE TABLE public.judge_info (
    id integer NOT NULL,
    j_name character varying(150),
    degree character varying(100),
    spec character varying(100),
    job_title character varying(250)
);
    DROP TABLE public.judge_info;
       public         heap    postgres    false            �            1259    33055    judge_info_id_seq    SEQUENCE     �   CREATE SEQUENCE public.judge_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.judge_info_id_seq;
       public          postgres    false    232            d           0    0    judge_info_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.judge_info_id_seq OWNED BY public.judge_info.id;
          public          postgres    false    231            �            1259    16496 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    postgres    false            �            1259    16495    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    216            e           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    215            �            1259    32972    research    TABLE     K  CREATE TABLE public.research (
    id integer NOT NULL,
    research_title character varying(300) NOT NULL,
    research_pdf character varying(300) NOT NULL,
    research_summary character varying(300),
    research_summary_ar character varying(300),
    research_date character varying(100) NOT NULL,
    researcher_id integer
);
    DROP TABLE public.research;
       public         heap    postgres    false            �            1259    32971    research_id_seq    SEQUENCE     �   CREATE SEQUENCE public.research_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.research_id_seq;
       public          postgres    false    220            f           0    0    research_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.research_id_seq OWNED BY public.research.id;
          public          postgres    false    219            �            1259    32963 
   researcher    TABLE     ^  CREATE TABLE public.researcher (
    id integer NOT NULL,
    researcher_name character varying(200) NOT NULL,
    rank character varying(50) NOT NULL,
    workplace character varying(100) NOT NULL,
    email character varying(50) NOT NULL,
    phone character varying(50) NOT NULL,
    cv character varying(300),
    photo character varying(300)
);
    DROP TABLE public.researcher;
       public         heap    postgres    false            �            1259    32962    researcher_id_seq    SEQUENCE     �   CREATE SEQUENCE public.researcher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.researcher_id_seq;
       public          postgres    false    218            g           0    0    researcher_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.researcher_id_seq OWNED BY public.researcher.id;
          public          postgres    false    217            �            1259    33017    sci_examination    TABLE     �   CREATE TABLE public.sci_examination (
    id integer NOT NULL,
    final_copy character varying(300),
    research_id integer
);
 #   DROP TABLE public.sci_examination;
       public         heap    postgres    false            �            1259    33016    sci_examination_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sci_examination_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.sci_examination_id_seq;
       public          postgres    false    228            h           0    0    sci_examination_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.sci_examination_id_seq OWNED BY public.sci_examination.id;
          public          postgres    false    227            �            1259    33010 	   the_judge    TABLE     �   CREATE TABLE public.the_judge (
    id integer NOT NULL,
    judge_name character varying(100),
    degree character varying(100)
);
    DROP TABLE public.the_judge;
       public         heap    postgres    false            �            1259    33009    the_judge_id_seq    SEQUENCE     �   CREATE SEQUENCE public.the_judge_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.the_judge_id_seq;
       public          postgres    false    226            i           0    0    the_judge_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.the_judge_id_seq OWNED BY public.the_judge.id;
          public          postgres    false    225            �           2604    33001    examination id    DEFAULT     p   ALTER TABLE ONLY public.examination ALTER COLUMN id SET DEFAULT nextval('public.examination_id_seq'::regclass);
 =   ALTER TABLE public.examination ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    33032    examn_details id    DEFAULT     t   ALTER TABLE ONLY public.examn_details ALTER COLUMN id SET DEFAULT nextval('public.examn_details_id_seq'::regclass);
 ?   ALTER TABLE public.examn_details ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    230    230            �           2604    32989 
   journal id    DEFAULT     h   ALTER TABLE ONLY public.journal ALTER COLUMN id SET DEFAULT nextval('public.journal_id_seq'::regclass);
 9   ALTER TABLE public.journal ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    33059    judge_info id    DEFAULT     n   ALTER TABLE ONLY public.judge_info ALTER COLUMN id SET DEFAULT nextval('public.judge_info_id_seq'::regclass);
 <   ALTER TABLE public.judge_info ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    232    232            �           2604    16499    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    32975    research id    DEFAULT     j   ALTER TABLE ONLY public.research ALTER COLUMN id SET DEFAULT nextval('public.research_id_seq'::regclass);
 :   ALTER TABLE public.research ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    32966    researcher id    DEFAULT     n   ALTER TABLE ONLY public.researcher ALTER COLUMN id SET DEFAULT nextval('public.researcher_id_seq'::regclass);
 <   ALTER TABLE public.researcher ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    33020    sci_examination id    DEFAULT     x   ALTER TABLE ONLY public.sci_examination ALTER COLUMN id SET DEFAULT nextval('public.sci_examination_id_seq'::regclass);
 A   ALTER TABLE public.sci_examination ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    33013    the_judge id    DEFAULT     l   ALTER TABLE ONLY public.the_judge ALTER COLUMN id SET DEFAULT nextval('public.the_judge_id_seq'::regclass);
 ;   ALTER TABLE public.the_judge ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            Q          0    32998    examination 
   TABLE DATA           ~   COPY public.examination (id, outgoing_letter, outgoing_date, incoming_letter, incoming_date, result, research_id) FROM stdin;
    public          postgres    false    224   %]       W          0    33029    examn_details 
   TABLE DATA           �   COPY public.examn_details (id, judge_letter, letter_date, edit_letter, edit_date, result, judge_id, sci_examination_id) FROM stdin;
    public          postgres    false    230   �]       O          0    32986    journal 
   TABLE DATA           Q   COPY public.journal (id, journal_edition, edition_date, research_id) FROM stdin;
    public          postgres    false    222   7^       Y          0    33056 
   judge_info 
   TABLE DATA           I   COPY public.judge_info (id, j_name, degree, spec, job_title) FROM stdin;
    public          postgres    false    232   h^       I          0    16496 
   migrations 
   TABLE DATA           6   COPY public.migrations (id, name, run_on) FROM stdin;
    public          postgres    false    216   w_       M          0    32972    research 
   TABLE DATA           �   COPY public.research (id, research_title, research_pdf, research_summary, research_summary_ar, research_date, researcher_id) FROM stdin;
    public          postgres    false    220   �`       K          0    32963 
   researcher 
   TABLE DATA           c   COPY public.researcher (id, researcher_name, rank, workplace, email, phone, cv, photo) FROM stdin;
    public          postgres    false    218   �a       U          0    33017    sci_examination 
   TABLE DATA           F   COPY public.sci_examination (id, final_copy, research_id) FROM stdin;
    public          postgres    false    228   �b       S          0    33010 	   the_judge 
   TABLE DATA           ;   COPY public.the_judge (id, judge_name, degree) FROM stdin;
    public          postgres    false    226   �c       j           0    0    examination_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.examination_id_seq', 6, true);
          public          postgres    false    223            k           0    0    examn_details_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.examn_details_id_seq', 10, true);
          public          postgres    false    229            l           0    0    journal_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.journal_id_seq', 6, true);
          public          postgres    false    221            m           0    0    judge_info_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.judge_info_id_seq', 6, true);
          public          postgres    false    231            n           0    0    migrations_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.migrations_id_seq', 63, true);
          public          postgres    false    215            o           0    0    research_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.research_id_seq', 6, true);
          public          postgres    false    219            p           0    0    researcher_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.researcher_id_seq', 6, true);
          public          postgres    false    217            q           0    0    sci_examination_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.sci_examination_id_seq', 6, true);
          public          postgres    false    227            r           0    0    the_judge_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.the_judge_id_seq', 10, true);
          public          postgres    false    225            �           2606    33003    examination examination_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.examination
    ADD CONSTRAINT examination_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.examination DROP CONSTRAINT examination_pkey;
       public            postgres    false    224            �           2606    33034     examn_details examn_details_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.examn_details
    ADD CONSTRAINT examn_details_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.examn_details DROP CONSTRAINT examn_details_pkey;
       public            postgres    false    230            �           2606    32991    journal journal_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.journal
    ADD CONSTRAINT journal_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.journal DROP CONSTRAINT journal_pkey;
       public            postgres    false    222            �           2606    33063    judge_info judge_info_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.judge_info
    ADD CONSTRAINT judge_info_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.judge_info DROP CONSTRAINT judge_info_pkey;
       public            postgres    false    232            �           2606    16501    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public            postgres    false    216            �           2606    32979    research research_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.research
    ADD CONSTRAINT research_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.research DROP CONSTRAINT research_pkey;
       public            postgres    false    220            �           2606    32970    researcher researcher_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.researcher
    ADD CONSTRAINT researcher_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.researcher DROP CONSTRAINT researcher_pkey;
       public            postgres    false    218            �           2606    33022 $   sci_examination sci_examination_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.sci_examination
    ADD CONSTRAINT sci_examination_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.sci_examination DROP CONSTRAINT sci_examination_pkey;
       public            postgres    false    228            �           2606    33015    the_judge the_judge_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.the_judge
    ADD CONSTRAINT the_judge_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.the_judge DROP CONSTRAINT the_judge_pkey;
       public            postgres    false    226            �           1259    33053    idx_research_title    INDEX     Q   CREATE INDEX idx_research_title ON public.research USING btree (research_title);
 &   DROP INDEX public.idx_research_title;
       public            postgres    false    220            �           1259    33054    idx_research_title_fts    INDEX     }   CREATE INDEX idx_research_title_fts ON public.research USING gin (to_tsvector('arabic'::regconfig, (research_title)::text));
 *   DROP INDEX public.idx_research_title_fts;
       public            postgres    false    220    220            �           1259    33065    idx_researcher_name    INDEX     U   CREATE INDEX idx_researcher_name ON public.researcher USING btree (researcher_name);
 '   DROP INDEX public.idx_researcher_name;
       public            postgres    false    218            �           1259    33066    idx_researcher_name_fts    INDEX     �   CREATE INDEX idx_researcher_name_fts ON public.researcher USING gin (to_tsvector('arabic'::regconfig, (researcher_name)::text));
 +   DROP INDEX public.idx_researcher_name_fts;
       public            postgres    false    218    218            �           2606    33004 (   examination examination_research_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.examination
    ADD CONSTRAINT examination_research_id_fkey FOREIGN KEY (research_id) REFERENCES public.research(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.examination DROP CONSTRAINT examination_research_id_fkey;
       public          postgres    false    224    220    3239            �           2606    33035 )   examn_details examn_details_judge_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.examn_details
    ADD CONSTRAINT examn_details_judge_id_fkey FOREIGN KEY (judge_id) REFERENCES public.the_judge(id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.examn_details DROP CONSTRAINT examn_details_judge_id_fkey;
       public          postgres    false    3245    226    230            �           2606    33040 3   examn_details examn_details_sci_examination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.examn_details
    ADD CONSTRAINT examn_details_sci_examination_id_fkey FOREIGN KEY (sci_examination_id) REFERENCES public.sci_examination(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.examn_details DROP CONSTRAINT examn_details_sci_examination_id_fkey;
       public          postgres    false    228    3247    230            �           2606    32992     journal journal_research_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.journal
    ADD CONSTRAINT journal_research_id_fkey FOREIGN KEY (research_id) REFERENCES public.research(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.journal DROP CONSTRAINT journal_research_id_fkey;
       public          postgres    false    3239    222    220            �           2606    32980 $   research research_researcher_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.research
    ADD CONSTRAINT research_researcher_id_fkey FOREIGN KEY (researcher_id) REFERENCES public.researcher(id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.research DROP CONSTRAINT research_researcher_id_fkey;
       public          postgres    false    218    220    3235            �           2606    33023 0   sci_examination sci_examination_research_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sci_examination
    ADD CONSTRAINT sci_examination_research_id_fkey FOREIGN KEY (research_id) REFERENCES public.research(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.sci_examination DROP CONSTRAINT sci_examination_research_id_fkey;
       public          postgres    false    3239    220    228            Q   a   x�3�45135�4202�54�5012�20 "=�(������n7��X~���Z��-@jՍ�7�ov�l�4�2�4153ŭ�����܂t�͸b����  D:4      W   �   x���A
�@E��)z�)��̴�UW��.�� ���M2�1�EEJ�"����3�&Q`�M�H�["WKD{wo��εص���h�C����ӒT�ܥ�`S3���VO�@��=d�R/�����0Ҍ�=OW��p±E�a8      O   !   x�3�45�4202�70�4�2C�q��qqq bGE      Y   �   x��Pۍ�0���p|Ts���y���;��Y' twqֻ�y엑�ޡC%[���g�x-��p����š�Z��� ��Y��^J4����os��=u�$xFD��^jٽ�'���k#/լ�QSi/���%]`�IN�z�T�זڋ�H�>M%S)K� 1Wv�T�'�2�ة�tƍ�⣻���})*uG�ōKf�U�f����%���V��g��k"oT#j�g�D ��	�@-����> ��na      I   -  x���]�� �g9�w(�e_�EŴ`hݘ=������4�L~�a>Xn>$J��6䠄>�R�C��ڰ�ށ������J����իe��+����RJU)�|+ɷ+��X��P[��1�5�#6K�ZK�.��֨s���������m�W� %���4a��׸��y���q!�-��i�c.�r�|����~T9#.���ig]�
�_}z8��A�]��f8R�М�K@� 6���=�N��3�'+��y�1�J��U��gFH�Zţj�Toy�ӟ�v;�I��2�s'���L��      M   �   x���MN�0���)r����Ϣ[X�*4����qd�B�i���H8��6L�ؔM7H㑟%��Aě��:�y�ϱ�Vn�#�d�q'�*���FGc�So�'������3�sy(�����|�+7v�
=�+3':��L�9�v�d��6�����ޅG}A��LI�_Dt�N�ip؟��1�L��g�@���/x����2������ԓ�or��)����#8 �~��-8R�(����^      K     x���MN�0���)rG���g�kv�f3$&�Mb�N���U\$%��"��d|��"����Xֳ�~���
;��wˇ��Ok��¾�'����M��)�vA�S;sڻ��f�]*h�l���`�	S���8��$e�:G��^prz�a�� 7Fh��p%�Db�%M�c��s�Gr�3L�y6�Hn1s�E �����t���?y_#P�C���\�m�bo�h��h)�ךV�䋖Њ9��5-g�� 2����{�eӌ{g���M��      U   �   x�%�;�0Dk���SA
Z���YbB>��D�� �9�iP�Y߆E4#���L, o������.-j����9��Fl�j,�?��T [Lej��7�ҽJm��HC�i��ES��}�3��#�_���@c���V�*��'nt&f2���XJ��Q�      S   k   x�3�T��~cˍ�7[�Dˍ7�����yc��7V�X~c�P��ƪ�76rY ���X��n�jh���o��v���7�8o��7*`74(�2F��� P�Z     