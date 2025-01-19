const API_KEY = 'OpenAI API KEY'
const monkey_API = 'SurveyMonkey API KEY'

const post_data = "MAN shooting a bow and arrow at a deer and killing it";


// //ADSENSE CODE to get the "average user of a site data"
// const express = require('express');
// const { google } = require('googleapis');
// const { OAuth2Client } = require('google-auth-library');
// const path = require('path');
// const fetch = require('node-fetch'); // Ensure you have node-fetch installed
// const { report } = require('process');
// const app = express();

// // Load OAuth credentials
// const oauth2Client = new OAuth2Client(
//   'YOUR_CLIENT_ID',
//   'YOUR_CLIENT_SECRET',
//   'YOUR_REDIRECT_URI'
// );

// const scopes = ['https://www.googleapis.com/auth/adsense.readonly'];

// // Redirect user to Google OAuth login page
// app.get('/auth/google', (req, res) => {
//   const url = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: scopes,
//   });
//   res.redirect(url);
// });

// // Google OAuth callback
// app.get('/auth/google/callback', async (req, res) => {
//   const { tokens } = await oauth2Client.getToken(req.query.code);
//   oauth2Client.setCredentials(tokens);

//   // Now you can make API requests with oauth2Client
//   const adsense = google.adsense({ version: 'v1.4', auth: oauth2Client });

//   // Get demographic data
//   const report = await adsense.accounts.reports.generate({
//     accountId: 'YOUR_ACCOUNT_ID',
//     startDate: '2025-01-01',
//     endDate: '2025-01-18',
//     dimension: ['AGE', 'GENDER', 'COUNTRY', 'DATE', 'DEVICE', 'LANGUAGE', 'TOPIC', 'BROWSER'],
//     metric: ['IMPRESSIONS', 'CLICKS'],
//   });

//   res.json(report.data);  // Send the report to the frontend
// });
//END OF THE ADSENSE CODE


// SAMPLE TEST REPORT DATA
//const report = require('./AdSenseTestData.json');
  // SAMPLE TEST REPORT DATA
const report = {
    "kind": "adsense#report",
    "totalItems": 6,
    "headers": [
      { "name": "Age", "type": "DIMENSION" },
      { "name": "Gender", "type": "DIMENSION" },
      { "name": "Country", "type": "DIMENSION" },
      { "name": "Device", "type": "DIMENSION" },
      { "name": "Impressions", "type": "METRIC" },
      { "name": "Clicks", "type": "METRIC" }
    ],
    "rows": [
      ["25-34", "Male", "Canada", "Mobile", 2000, 80],
      ["35-44", "Female", "United States", "Desktop", 1800, 70],
      ["45-54", "Female", "Germany", "Tablet", 1500, 50],
      ["25-34", "Female", "United Kingdom", "Mobile", 2200, 100],
      ["18-24", "Male", "Australia", "Desktop", 1300, 60],
      ["35-44", "Male", "India", "Mobile", 1700, 65]
    ],
    "averages": [1700, 70]
  }
  
const language = "English"; // Language of the survey question
const question_length = 20; // Maximum length of the survey question
const response_length = 20; // Maximum length of the survey response

const user_data = "name : chad, age : 29, location: Vancouver Canada, Time : 4:35 PM"; 
// here are the following endpoints that can be used to get the user data
// GET /surveys/ip/rollups  add the ip address 
// GET /surveys/first_name/rollups 
// GET /surveys/last_name/rollups    
// /users/me


const financial_incentives = "Discount, special edition, coupons, free-shipping, exclusive member discounts, bundle offers, all of a specific product";
// here are the following endpoints that can be used to get the financial incentives
// it is possible discounts that can be offered to the user

const product_link = ""; 
// here are the following endpoints that can be used to get the product link or the site that the survey is on. 
// GET /collectors/{collector_id}


const general_review_data = "[SURVEY 1] 5.0 out of 5 stars Awesome. I absolutely love this! I am self employed and don't have a lot of extra time for vacuuming everyday and washing the floors. This machine is so great. To me, it is the same as using a dishwasher or a washer and dryer. [SURVEY 2] What do you think about the product? Its ok."; // /surveys/{survey_id}/responses/bulk


const past_user_survey_data = ""
// note that the past user survey data is only a guess because the only avaliable identifiers to link user's to their past survey data is the IP address, first name, last name, and email address. ( there is not enough information to link the user to their past survey data provided in the SurveyMonkey API and the AdSense API only gives generic dimensional data ) 


const dev_prompt = `You are an AI marketing profiling agent. You will receive data about a user and categorize them into one of three shopper types based on their motivation to answer a survey. You will then generate a survey question and possible answers based on the user's profile, and the post information to create a relavant question. The three shopper types are:
TYPE 1. Motivated by tangible goods
TYPE 2. Motivated by getting their voice heard, an emotional shopper
TYPE 3. Not motivated by anything and will not answer a survey under any circumstances.

The post will have some form of description, and should relate to the post if possible. For example, if the post refers to a company, the question may ask about the users opinions of the company or how likely they may use their products. If it is about a sport or an object, the questions may ask about related questions or purchases in regards to the sport. If there is no clear question, create a generic question.

You will also receive a small sample of the dataset of the already available survey responses as a benchmark. If you do not receive a small sample. You will generate a small sample based on your impression of the product/service that the survey is asking about.

An example for how you can profile this customer is by looking at the IP address, checking the location and looking up the "culture" for that region and what the majority of people in that region is motivated by.

All surveys have one question and multiple answer choices. Feel free to be creative with questions and answers. Surveys cannot be open ended. Always give the user a choice of answers.

Dynamic data input is going to surrounded by [BLOCK START] and [BLOCK END]. DO NOT OUTPUT IT IN THE FINAL RESPONSE.

The response options should be very brief.

If it is a TYPE 1 then create a survey that may offer a small preset discount or a product promotion that is specified in the following for a SPECIFIC product related to the post, or the themes of the post, 
For example: a post about music could sell headphones, or be about apps such as spoitify. This is just an example based on the post description which will be sent later. 

Some example discounts are specified in the following, it should not be exactly this, but some of the options may look like this:

[BLOCK START]
${financial_incentives}
[BLOCK END]

If it is a TYPE 2, create a survey that makes the customer feel heard, and/or invokes emotion (eg. anger, awe, excitement):
[BLOCK START]
${past_user_survey_data}
[BLOCK END]

If it is a TYPE 3, return a generalized question 

Here is the user data:
[BLOCK START]
${user_data}
[BLOCK END]

Here is the data of the average user accessing the site/survey :
[BLOCK START]
${report}
[BLOCK END]

Here are the past survey answers to specific questions or general reviews, these are NOT from the user:
[BLOCK START]
${general_review_data}
[BLOCK END]

Here are past survey answers to specific questions or general reviews that ARE from the user:
[BLOCK START]
${past_user_survey_data}
[BLOCK END]

Here is the product link:
[BLOCK START]
${product_link}
[BLOCK END]

RETURN ONLY THE SURVEY QUESTION AND POSSIBLE ANSWERS (multiple choice or open ended). DO NOT RETURN THE USER DATA OR PAST SURVEY ANSWERS. People tend to feel creeped out when they find out their data is being collected. The max length of the question should be ${question_length} words. If you choose to continue with a multiple part question, the max length of the responses should be ${response_length} words. If it is a open-ended question then disregard the max response length.

[IMPORTANT OUTPUT GUIDELINES]
Only return the survey question and possible answers in the following format, NOTHING ELSE, not even a greeting or a goodbye or any other information that is not the survey question and possible answers:
|How do you think we can enhance your overall experience with our product?|Integrating a new feature that allows you to customize your experience. |Adding a new color option for the product. |None of the above


You will also be given data about an associated video. Use the post data to customize the question if natural.
Here is the post data: 
`;



// Request Queue Implementation
class RequestQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.process();
        });
    }

    async process() {
        if (this.processing || this.queue.length === 0) return;
        
        this.processing = true;
        const { task, resolve, reject } = this.queue.shift();
        
        try {
            const result = await task();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.processing = false;
            await sleep(2000); // Delay between requests
            this.process();
        }
    }
}

// Helper function for delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize request queue
const requestQueue = new RequestQueue();

// Main function to get survey questions
async function getSurveyQuestion(post_data) {
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: dev_prompt + post_data}
                    ],
                    max_tokens: 2000,
                }),
            });

            if (!response.ok) {
                throw new Error(`API response error: ${response.status}`);
            }

            const data = await response.json();
            if (!data.choices?.[0]?.message?.content) {
                throw new Error("Invalid response format");
            }

            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error(`Attempt ${retryCount + 1} failed:`, error);
            retryCount++;
            if (retryCount === maxRetries) {
                throw error;
            }
            await sleep(2000 * retryCount); // Exponential backoff
        }
    }
}

// Server creation function
async function createServer(iframe_id, post_data) {
    try {
        // Get survey question through the request queue
        const gpt_response = await requestQueue.add(() => getSurveyQuestion(post_data));
        await sleep(2000);
        
        console.log(gpt_response);
        const parts = gpt_response.split("|");
        console.log(parts);
        
        const choices = parts.slice(2).map(choice => ({
            "text": choice.trim()
        }));
        
        // Create survey with retry logic
        const maxRetries = 3;
        let retryCount = 0;
        let delay = 1000;

        while (retryCount < maxRetries) {
            try {
                const surveyResponse = await fetch("https://api.surveymonkey.com/v3/surveys", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${monkey_API}`
                    },
                    body: JSON.stringify({
                        "nickname": "My Survey",
                        "language": "en",
                        "buttons_text": {
                            "next_button": "Next",
                            "prev_button": "Previous",
                            "exit_button": "Exit",
                            "done_button": "Submit"
                        },
                        "pages": [{
                            "questions": [{
                                "headings": [{
                                    "heading": parts[1]
                                }],
                                "position": 1,
                                "family": "single_choice",
                                "subtype": "vertical",
                                "answers": {
                                    "choices": choices
                                }
                            }]
                        }]
                    })
                });

                if (!surveyResponse.ok) {
                    throw new Error(`Survey creation failed: ${surveyResponse.status}`);
                }

                const data = await surveyResponse.json();
                const surveyId = data.id;

                // Create collector
                const collectorResponse = await fetch(`https://api.surveymonkey.com/v3/surveys/${surveyId}/collectors`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${monkey_API}`
                    },
                    body: JSON.stringify({
                        "type": "weblink",
                        "name": "Web Collector",
                        "thank_you_message": "Thank you for completing the survey!",
                        "display_survey_results": false,
                        "allow_multiple_responses": true
                    })
                });

                if (!collectorResponse.ok) {
                    throw new Error(`Collector creation failed: ${collectorResponse.status}`);
                }

                const collectorData = await collectorResponse.json();
                console.log("Public Survey URL:", collectorData.url);

                const iframe = document.getElementById(iframe_id);
                if (iframe) {
                    iframe.src = collectorData.url;
                }

                break; // Exit loop if successful
            } catch (error) {
                console.error(`Attempt ${retryCount + 1} failed:`, error);
                retryCount++;
                if (retryCount === maxRetries) {
                    throw error;
                }
                delay *= 2; // Exponential backoff
                await sleep(delay);
            }
        }
    } catch (error) {
        console.error("Failed to create survey:", error);
    }
}

// Main function to begin the process
async function begin() {
    const posts = [
        {
            title: "I don't have the time for this",
            content: "I love Survey Monkey!",
            media: "./videos/ditch_the_drama.mp4",
            mediaType: "video",
            description: "Surveymonkey employee writing on her employee",
            comments: [
                "\n\n\n\nAba12: Great post!",
                "Teeop2: Interesting thoughts.",
                "thegoat: Keep it up!"
            ],
            videoAttributes: {
                autoplay: false,  // Ensures video doesn't autoplay
                controls: true,   // Allows user to control playback
            }
        },
        {
            title: "Monkey",
            content: "Orangutan... wow!",
            media: "./videos/best_ape.mp4",
            mediaType: "video",
            description: "Orangutan video of a reall fat orangutang eating fruit",
            comments: [
                "\n\n\n\ncheeseiswizz: Stupid monkey hahaha.",
                "Maximus: @cheeseiswizz probably smarter than you",
                "Cupcupcup: monkey!"
            ],
            videoAttributes: {
                autoplay: false,  // Ensures video doesn't autoplay
                controls: true,   // Allows user to control playback
            }
        },
        {
            title: "Don't wing it!",
            content: "Need that data.",
            media: "./videos/wing_it.mp4",
            mediaType: "video",
            description: "Survey monkey video don't wing it.",
            comments: [
                "\n\n\n\n4cheese: So true!!",
                "EverythingB: Real lol",
                "Seseme: Amen!"
            ],
            videoAttributes: {
                autoplay: false,  // Ensures video doesn't autoplay
                controls: true,   // Allows user to control playback
            }
        },
        {
            title: "Fit him perfectly",
            content: "He's too fresh.",
            media: "./videos/fresh.mp4",
            mediaType: "video",
            description: "Monkey kissing a glass window with small child on other side",
            comments: [
                "\n\n\n\nJJyear: Jealous!",
                "Polymeta: What a polite young fellow.",
                "Whippers: That's my son!"
            ],
            videoAttributes: {
                autoplay: false,  // Ensures video doesn't autoplay
                controls: true,   // Allows user to control playback
            }
        },
        {
            title: "LeBron James",
            content: "The GOAT.",
            media: "./videos/LeBron.mp4",
            mediaType: "video",
            description: "Basketball player Lebron james dunking and portraying his skills with music playing",
            comments: [
                "Potus: The greatest of all time!",
                "Vladamir: My glorious king :D",
                "Mao: Michael was better"
            ],
            videoAttributes: {
                autoplay: false,  // Ensures video doesn't autoplay
                controls: true,   // Allows user to control playback
            }
        }
    ];

    const feed = document.getElementById('feed');

    // Process posts sequentially
    for (const post of posts) {
        try {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            // Post Content
            const postContent = document.createElement('div');
            postContent.classList.add('post-content');

            // Add media if available
            if (post.mediaType) {
                const mediaElement = document.createElement(post.mediaType === "video" ? 'iframe' : 'img');
                if (post.mediaType === "video") {
                    mediaElement.src = post.media;
                    mediaElement.width = "100%";
                    mediaElement.height = "600px";
                    mediaElement.style.maxWidth = "337.5px";
                    mediaElement.frameBorder = "0";
                    mediaElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    mediaElement.allowFullscreen = true;
                } else if (post.mediaType === "image") {
                    mediaElement.src = post.media;
                    mediaElement.alt = "Post media";
                    mediaElement.style.width = "100%";
                    mediaElement.style.borderRadius = "8px";
                    mediaElement.style.marginBottom = "16px";
                }
                postContent.appendChild(mediaElement);
            }

            // Create container for title, content, and button
            const contentContainer = document.createElement('div');
            contentContainer.style.display = "flex";
            contentContainer.style.alignItems = "center";
            contentContainer.style.justifyContent = "space-between";
            contentContainer.style.gap = "16px";

            // Title and content container
            const textContainer = document.createElement('div');

            const title = document.createElement('h2');
            title.textContent = post.title;

            const content = document.createElement('p');
            content.textContent = post.content;

            textContainer.appendChild(title);
            textContainer.appendChild(content);

            // Button to open comment section
            const button = document.createElement('button');
            button.style.width = "50px";
            button.style.height = "50px";
            button.style.border = "none";
            button.style.cursor = "pointer";

            const commentLogo = document.createElement('img');
            commentLogo.src = 'https://cdn.freebiesupply.com/logos/large/2x/surveymonkey-icon-logo-png-transparent.png';
            commentLogo.alt = 'Comment';
            commentLogo.style.width = "100%";
            commentLogo.style.height = "100%";
            commentLogo.style.objectFit = "contain";

            button.appendChild(commentLogo);
            contentContainer.appendChild(textContainer);
            contentContainer.appendChild(button);
            postContent.appendChild(contentContainer);

            // Comments Section
            const commentsSection = document.createElement('div');
            commentsSection.classList.add('comments-section');
            commentsSection.hidden = true;

            // Create iframe container
            const iframeContainer = document.createElement('div');
            iframeContainer.style.height = "40%";
            const iframe = document.createElement('iframe');
            iframe.id = post.title;
            iframe.width = "100%";
            iframe.height = "100%";
            iframeContainer.appendChild(iframe);

            // Create comments container
            const commentsContainer = document.createElement('div');
            commentsContainer.style.height = "60%";
            commentsContainer.style.overflowY = "auto";

            if (post.comments.length === 0) {
                const noComments = document.createElement('p');
                noComments.textContent = "No comments yet.";
                commentsContainer.appendChild(noComments);
            } else {
                post.comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    const commentText = document.createElement('p');
                    commentText.textContent = comment;
                    commentElement.appendChild(commentText);
                    commentsContainer.appendChild(commentElement);
                });
            }

            commentsSection.appendChild(iframeContainer);
            commentsSection.appendChild(commentsContainer);

            button.onclick = () => {
                commentsSection.hidden = !commentsSection.hidden;
            };

            postElement.appendChild(postContent);
            postElement.appendChild(commentsSection);
            feed.appendChild(postElement);

            // Wait for server creation to complete before moving to next post
            await createServer(post.title, post.description);
            await sleep(3000); // Add delay between posts
        } catch (error) {
            console.error(`Error processing post ${post.title}:`, error);
        }
    }
}

// Start the application
begin();
