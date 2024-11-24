# CTF Platform - GDSC EEC

Welcome to the Google Developer Students Club (GDSC) Capture The Flag (CTF) website for Easwari Engineering College! This dynamic platform is tailored for students eager to explore the exciting realms of cybersecurity and hone their coding skills. Below, we break down the key features of our CTF website to give you a clear understanding of what awaits.

## Features:
### User Authentication:

Easily login or create a new account to access the full spectrum of CTF challenges.

### Custom Terminal Environment:
Immerse yourself in a unique terminal theme that replicates real-world hacking scenarios. And enhances the behavior of working with terminals a lot easier

### Flag Submission:
Submit your flags for evaluation and receive instant feedback on your progress.

### Leaderboard and Student Profile:
Track your performance on the leaderboard and showcase your achievements on your personalized student profile.

### Admin Panel:
The [Admin Panel](https://github.com/bhaaratkrishnan/gdsc-eec-ctf-admin) helps in creating and maintaining various challenges along with their respective domains.

## Technologies Used
- Sveltekit 
- Tailwind CSS
- Firebase(Firestore and Firebase Authentication)
- Google Cloud(Deployment)
- Docker(Serverless Container based Deployment)

## Preview
#### Terminal Page
![Home page](/static/images/terminalPage.png)
#### Profile Page
![Profile Page](/static/images/profilePage.png)

## Development
Use the `.env.example` file for creating `.env` containing the firebase configuration for the application.

Start the development server
```bash
npm run dev
```
Production build
```bash
npm run build
```
## Deployment to Google Cloud Run

Make sure to define the environment variables
```bash
export $project_id=<your-project-id-here>

export DOCKER_URL=us-central1-docker.pkg.dev/${project_id}/gdsc-eec-ctf/gdsc-eec-ctf-website

docker build -t $DOCKER_URL .

docker push $DOCKER_URL

gcloud run deploy gdsc-eec-ctf-website --image=$DOCKER_URL --allow-unauthenticated --port=3000 --platform=managed --max-instances=10 --region=us-central1
```