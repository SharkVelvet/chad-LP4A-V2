// Simple production starter that doesn't require bundling
import { register } from 'tsx/esm/api';

// Register TypeScript loader
register();

// Import and run the TypeScript server
await import('./index.ts');
