/** Tailwind configuration — palette & typography tokens for the premium friterie theme */
module.exports = {
	content: [
		'./**/*.html',
		'./**/*.js'
	],
	theme: {
		extend: {
			colors: {
				'bg-start': '#221A14',
				'bg-end': '#3A281C',
				card: '#101010',
				primary: '#F2B705',
				accent: '#D97A1E',
				text: '#F5F1E8',
				'text-secondary': '#B8B1A7'
			},
			fontFamily: {
				display: ['Birthstone', 'serif'],
				sans: ['Inter', 'ui-sans-serif', 'system-ui']
			},
			fontSize: {
				h1: ['3.5rem', { lineHeight: '1.02' }],
				h2: ['2.5rem', { lineHeight: '1.05' }],
				h3: ['1.8rem', { lineHeight: '1.08' }],
				h4: ['1.125rem', { lineHeight: '1.2' }],
				h5: ['0.95rem', { lineHeight: '1.25' }],
				h6: ['0.85rem', { lineHeight: '1.25' }]
			},
			boxShadow: {
				'soft-gold': '0 6px 30px rgba(242,183,5,0.08)',
				'lift-1': '0 6px 18px rgba(0,0,0,0.45)'
			}
		}
	},
	plugins: []
};
