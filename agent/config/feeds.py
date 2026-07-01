"""
AdorniLeaks — Fuentes RSS monitoreadas
El agente busca menciones de Adorni en todos estos feeds.
"""

# Palabras clave para filtrar artículos relevantes en el texto/título
KEYWORDS = [
    "adorni",
    "manuel adorni",
    "porta voz",
    "portavoz",
    "vocero presidencial",
    "vocero",
]

# Categorías válidas del sistema
CATEGORIAS = [
    "Causas Judiciales",
    "Conferencias de Prensa",
    "Desaires",
    "Dichos Polémicos",
    "Gobierno",
    "Sin Categoría",
]

# Fuentes RSS a monitorear
FEEDS = [
    {
        "nombre": "Infobae",
        "url": "https://www.infobae.com/feeds/rss/",
        "categoria_default": "Gobierno",
    },
    {
        "nombre": "Infobae Política",
        "url": "https://www.infobae.com/feeds/rss/politica/",
        "categoria_default": "Gobierno",
    },
    {
        "nombre": "Clarín",
        "url": "https://www.clarin.com/rss/politica/",
        "categoria_default": "Gobierno",
    },
    {
        "nombre": "La Nación",
        "url": "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml",
        "categoria_default": "Gobierno",
    },
    {
        "nombre": "La Nación Política",
        "url": "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/politica/?outputType=xml",
        "categoria_default": "Gobierno",
    },
    {
        "nombre": "Página 12",
        "url": "https://www.pagina12.com.ar/rss/secciones/el-pais/notas",
        "categoria_default": "Dichos Polémicos",
    },
    {
        "nombre": "TN",
        "url": "https://tn.com.ar/rss/politica.xml",
        "categoria_default": "Conferencias de Prensa",
    },
    {
        "nombre": "Ámbito",
        "url": "https://www.ambito.com/rss/pages/politica.xml",
        "categoria_default": "Gobierno",
    },
    {
        "nombre": "El Destape",
        "url": "https://www.eldestapeweb.com/rss/",
        "categoria_default": "Causas Judiciales",
    },
    {
        "nombre": "Chequeado",
        "url": "https://chequeado.com/feed/",
        "categoria_default": "Dichos Polémicos",
    },
    {
        "nombre": "Perfil",
        "url": "https://www.perfil.com/feed/",
        "categoria_default": "Gobierno",
    },
    {
        "nombre": "MDZ Online",
        "url": "https://www.mdzol.com/rss/",
        "categoria_default": "Dichos Polémicos",
    },
]
