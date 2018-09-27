<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'amazing-college');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'V8yPv @w<OD$IiXxB[cAyfLr@HXKYSVY8;w5Z4,s3oe92+VM*0sn&cJ~J2C%8!gD');
define('SECURE_AUTH_KEY',  '6)EK.Q!n`8%db|OWdl)0d^j#^tB;oNXKYY/#:dBB.m!>|E7VN=bFnyc#W%<n;SZF');
define('LOGGED_IN_KEY',    'J*z,@(k%m&)QgpD2m;r#YJBI!}5:GQ+W!_~l{,Mc9H]Z7*Ik2l-<?cH;_bc$L/,v');
define('NONCE_KEY',        ',&YTQt( SD>%PkP?]1a27(mau~sa5 WS+iP!Yy%7RoRsO^fE:Q.QGEXKUFL2)3`d');
define('AUTH_SALT',        'MJ99)45=P@?j|]n/^ks>)b^}t.7 3P2)7x%Nj$ZX8Qng-z:M%rmbug^j`EKmio%V');
define('SECURE_AUTH_SALT', 'B[FOu.?;DK0-vQDDa}dsD[n:}i{ru{a4[,|/?&OE3r&Nnh=2q RnjN?P$N!|,sKE');
define('LOGGED_IN_SALT',   '[/nIXT]pHn8$/]A^iis?dTd8Pd&.%/RSEIpqd!Z#{Kc (ai:-;Cd45:XLT{mDr$q');
define('NONCE_SALT',       'b&P~vr/P8:Txv,Fy0Er}5KxA}*x7_nyj Z82`1bdl[d~+NsbuJc.NN.-*K/|; C6');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
