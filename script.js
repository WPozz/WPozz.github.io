<script>
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            fontFamily: { sans: ['Inter', 'sans-serif'] },
            colors: {
              teal: { 50:'#f0fdfa', 100:'#ccfbf1', 200:'#99f6e4', 300:'#5eead4', 400:'#2dd4bf', 500:'#14b8a6', 600:'#0d9488', 700:'#0f766e', 800:'#115e59', 900:'#134e4a' }
            }
          }
        }
      }
    </script>

    <link rel="stylesheet" href="style.css">
    <style>
        /* Force all animated elements to be visible immediately */
        .fade-in-up {
            opacity: 1 !important;
            transform: none !important;
        }
        
        /* Ensure the body takes up full height */
        body, html {
            height: 100%;
            overflow-x: hidden;
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-300 transition-colors duration-300">

