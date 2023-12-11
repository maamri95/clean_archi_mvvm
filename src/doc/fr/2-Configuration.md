## Configuration

Pour que l'application fonctionne correctement dans votre environnement, vous devrez peut-être la configurer selon vos besoins spécifiques. Cette section décrit les étapes nécessaires pour configurer votre instance de _Clean Architecture MVVM for React_.

### Variables d'environnement

Le projet utilise des variables d'environnement pour gérer les configurations qui diffèrent entre les environnements de développement, de test et de production. Vous trouverez un fichier `.env.example` à la racine du projet, qui liste toutes les variables d'environnement nécessaires.

Pour configurer les variables d'environnement :

1.  Copiez le fichier `.env.example` et renommez la copie en `.env`.
```bash
cp .env.example .env
```

3.  Ouvrez le fichier `.env` et remplissez les valeurs requises. Par exemple :
```bash
NXT_APP_API_ENDPOINT=https://your-api-endpoint.com
NXT_APP_OTHER_CONFIG=yourConfigValue
```

Assurez-vous de ne jamais commettre le fichier `.env` dans votre dépôt, car il peut contenir des informations sensibles.
### Configuration des variables d'environnement

Pour garantir que l'application fonctionne correctement et en toute sécurité, nous utilisons des variables d'environnement. Ces variables permettent de gérer des paramètres et des clés essentiels à l'exécution de l'application dans différents environnements.

Notre projet utilise `zod` pour définir et valider le schéma des variables d'environnement. Vous trouverez ci-dessous le schéma actuel dans `env.ts`, qui doit être mis à jour chaque fois que vous ajoutez de nouvelles variables d'environnement.

### Schéma actuel des variables d'environnement

Le fichier `env.ts` contient un schéma `zod` qui valide et transforme les variables d'environnement. Voici un extrait du schéma actuel :

```ts
	// env.ts
import { z } from 'zod';

export const envSchema = z.object({
  // Exemple de variable d'environnement validée
  NXT_APP_API_ENDPOINT: z
    .string({
      invalid_type_error: "NXT_APP_API_ENDPOINT doit être une URL valide",
      required_error: "NXT_APP_API_ENDPOINT est obligatoire",
    })
    .url("NXT_APP_API_ENDPOINT doit être une URL valide")
    .transform((value) => new URL(value)),
  // ... autres validations
});
```
### Remarque importante

**N'oubliez pas :** Les variables d'environnement sont sensibles et ne doivent jamais être incluses dans le contrôle de version, surtout si elles contiennent des clés secrètes ou des informations d'identification. Assurez-vous que le fichier `.env` est bien listé dans votre `.gitignore`.

### Configuration Additionnelle

#### Changement du préfixe des variables d'environnement

Par défaut, le projet utilise `NXT_` comme préfixe pour les variables d'environnement. Si vous souhaitez changer ce préfixe pour quelque chose de plus spécifique à votre projet ou à votre organisation, suivez les étapes ci-dessous :

1.  Ouvrez le fichier `vite.config.ts` situé à la racine de votre projet.
2.  Localisez la configuration `envPrefix` qui est passée dans les options de Vite. Par exemple :
```ts
    // vite.config.ts
    export default defineConfig({
      // ...autres configurations
      envPrefix: 'NXT_',
    });
```
3.  Remplacez `'NXT_'` par le préfixe de votre choix. Par exemple, si vous voulez utiliser `MYAPP_` comme préfixe, cela donnerait :
```ts
	// vite.config.ts
    export default defineConfig({
      // ...autres configurations
      envPrefix: 'MYAPP_',
    });
```

4.  Mettez à jour toutes les occurrences des variables d'environnement dans votre projet pour qu'elles utilisent le nouveau préfixe.

#### Mise à jour du fichier `.env`

Après avoir changé le préfixe dans `vite.config.ts`, assurez-vous de renommer également les variables d'environnement dans votre fichier `.env`, `.env.example` et `env.ts` pour refléter ce changement.

#### Vérification de la configuration

Il est important de vérifier que votre application fonctionne correctement après avoir modifié le préfixe des variables d'environnement. Lancez votre application en développement pour vous assurer que les variables sont correctement détectées et que l'application se comporte comme prévu.