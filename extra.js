const getPostByTopic = async (req, res, next) => {
    console.log(req.params.id)
    try {

        const posts = await Post.find({ topicId: req.params.id });
        for (let i = 0; i < posts.length; i++) {
            await posts[i].populate({
                path: 'topicId'
            }).execPopulate();
        }
        console.log(posts);
        if (!posts) {
            return res.status(404).json({
                message: 'oops no post found releted to this topic!'
            })
        }
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}